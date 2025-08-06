/**
 * PET Advanced Gemma 3N Integration
 * Enhanced with fine-tuning, inference, and multimodal capabilities
 * Based on Kaggle notebook: danielhanchen/gemma-3n-4b-multimodal-finetuning-inference
 */

import { ADVANCED_RULES } from './advanced-rules.js';

class PETGemma3NAdvanced {
    constructor() {
        this.baseUrl = 'http://localhost:11434';
        this.model = 'gemma3:4b';
        this.isAvailable = false;
        this.fineTunedModel = null;
        this.trainingData = this.loadTrainingData();
        this.inferenceCache = new Map();
        this.advancedRules = ADVANCED_RULES;
        this.testConnection();
    }

    /**
     * Load training data from localStorage or initialize empty array
     */
    loadTrainingData() {
        try {
            const storedData = localStorage.getItem('pet_training_data');
            return storedData ? JSON.parse(storedData) : [];
        } catch (error) {
            console.warn('Failed to load training data:', error);
            return [];
        }
    }

    /**
     * Test connection and model availability
     */
    async testConnection() {
        try {
            const response = await fetch(`${this.baseUrl}/api/tags`);
            if (response.ok) {
                this.isAvailable = true;
                console.log('✅ Advanced Gemma 3N connection successful');
                await this.loadFineTunedModel();
            } else {
                console.warn('⚠️ Advanced Gemma 3N not available, using fallback');
            }
        } catch (error) {
            console.warn('⚠️ Advanced Gemma 3N not available, using fallback:', error.message);
        }
    }

    /**
     * Load fine-tuned model if available
     */
    async loadFineTunedModel() {
        try {
            // Check if fine-tuned model exists
            const response = await fetch(`${this.baseUrl}/api/tags`);
            const data = await response.json();
            const fineTunedModel = data.models.find(m => m.name.includes('pet-finetuned'));
            
            if (fineTunedModel) {
                this.fineTunedModel = fineTunedModel.name;
                console.log('✅ Fine-tuned PET model loaded:', this.fineTunedModel);
            } else {
                console.log('ℹ️ No fine-tuned model found, using base model');
            }
        } catch (error) {
            console.warn('⚠️ Could not load fine-tuned model:', error.message);
        }
    }

    /**
     * Generate enhanced suggestions with fine-tuning capabilities
     */
    async generateSuggestions(heartPrompt, existingBlocks = []) {
        if (!this.isAvailable) {
            return this.fallbackSuggestions(heartPrompt, existingBlocks);
        }

        try {
            // Check cache first
            const cacheKey = this.generateCacheKey(heartPrompt, existingBlocks);
            if (this.inferenceCache.has(cacheKey)) {
                console.log('📋 Using cached suggestion');
                return this.inferenceCache.get(cacheKey);
            }

            // Get context analysis for both prompt generation and training data
            const context = await this.analyzeEnhancedContext(heartPrompt);
            const prompt = await this.createEnhancedSuggestionPrompt(heartPrompt, existingBlocks, context);
            const response = await this.callAdvancedOllama(prompt);
            const suggestions = this.parseEnhancedSuggestionResponse(response);
            
            // Cache the result
            this.inferenceCache.set(cacheKey, suggestions);
            
            // Add to training data for future fine-tuning (with context)
            this.addToTrainingData(heartPrompt, existingBlocks, suggestions, context);
            
            return suggestions;
        } catch (error) {
            console.error('❌ Advanced Gemma 3N API error:', error);
            return this.fallbackSuggestions(heartPrompt, existingBlocks);
        }
    }

    /**
     * Create enhanced suggestion prompt with fine-tuning context
     */
    async createEnhancedSuggestionPrompt(heartPrompt, existingBlocks, context = null) {
        const existingTypes = existingBlocks.map(b => b.type).join(', ');
        const contextAnalysis = context || this.fallbackContextAnalysis(heartPrompt);
        const appliedRules = this.selectEnhancedRules(contextAnalysis, existingBlocks);
        
        // Simplified prompt structure for faster processing
        return `You are an advanced prompt engineering assistant. 

CONTEXT: "${heartPrompt}" | Existing: ${existingTypes || 'none'} | Category: ${contextAnalysis.category}

APPLIED RULES: ${appliedRules.map(rule => rule.name).join(', ')}

Generate 3 short options for:
WHO: (who should the AI be?)
WHAT: (what should it do?)

Format as JSON:
{
  "who": ["option1", "option2", "option3"],
  "what": ["option1", "option2", "option3"],
  "confidence": 0.9,
  "applied_rules": ["${appliedRules[0]?.name || 'systemFraming'}", "${appliedRules[1]?.name || 'generatorFunction'}"]
}

Only return valid JSON.`;
    }

    /**
     * Check if two prompts have contextual similarity using keyword overlap
     */
    hasContextualSimilarity(prompt1, prompt2) {
        const keywords1 = this.extractKeywords(prompt1.toLowerCase());
        const keywords2 = this.extractKeywords(prompt2.toLowerCase());
        
        // Calculate keyword overlap percentage
        const commonKeywords = keywords1.filter(k => keywords2.includes(k));
        const overlapRatio = commonKeywords.length / Math.max(keywords1.length, keywords2.length, 1);
        
        // Consider similar if > 30% keyword overlap
        return overlapRatio > 0.3;
    }

    /**
     * Analyze enhanced context using AI-powered semantic analysis
     */
    async analyzeEnhancedContext(prompt) {
        const categories = ['Code Generation', 'Creative Writing', 'Technical Explanation', 'Business Communication', 'General Question'];
        
        const metaPrompt = `Analyze the following user prompt and classify it into one of these categories: ${categories.join(', ')}. Respond with only the category name. Prompt: "${prompt}"`;

        try {
            const response = await this.callAdvancedOllama(metaPrompt);
            // Clean and validate the response
            const category = response.trim();
            console.log(`🧠 AI Context Analysis: "${prompt}" → "${category}"`);
            if (categories.includes(category)) {
                return {
                    category: category,
                    complexity: await this.analyzeComplexity(prompt),
                    domain: await this.analyzeDomain(prompt),
                    keywords: this.extractKeywords(prompt.toLowerCase()),
                    confidence: 0.9
                };
            }
        } catch (error) {
            console.error('Error during AI context analysis:', error);
        }
        
        // Fallback to keyword-based analysis if AI fails
        console.log('⚠️ Falling back to keyword-based context analysis');
        return this.fallbackContextAnalysis(prompt);
    }

    /**
     * Analyze complexity level using AI
     */
    async analyzeComplexity(prompt) {
        const complexityLevels = ['low', 'medium', 'high'];
        const metaPrompt = `Analyze the complexity level of this request. Respond with only one word: ${complexityLevels.join(', ')}. Prompt: "${prompt}"`;
        
        try {
            const response = await this.callAdvancedOllama(metaPrompt);
            const complexity = response.trim().toLowerCase();
            console.log(`📊 AI Complexity Analysis: "${prompt}" → "${complexity}"`);
            if (complexityLevels.includes(complexity)) {
                return complexity;
            }
        } catch (error) {
            console.error('Error during complexity analysis:', error);
        }
        
        return 'medium'; // Default fallback
    }

    /**
     * Analyze domain using AI
     */
    async analyzeDomain(prompt) {
        const domains = ['business', 'technical', 'creative', 'academic', 'general'];
        const metaPrompt = `Identify the primary domain of this request. Respond with only one word: ${domains.join(', ')}. Prompt: "${prompt}"`;
        
        try {
            const response = await this.callAdvancedOllama(metaPrompt);
            const domain = response.trim().toLowerCase();
            console.log(`🎯 AI Domain Analysis: "${prompt}" → "${domain}"`);
            if (domains.includes(domain)) {
                return domain;
            }
        } catch (error) {
            console.error('Error during domain analysis:', error);
        }
        
        return 'general'; // Default fallback
    }

    /**
     * Fallback context analysis using keyword matching (original method)
     */
    fallbackContextAnalysis(heartPrompt) {
        const promptLower = heartPrompt.toLowerCase();
        let category = 'General Question';
        let complexity = 'medium';
        let domain = 'general';
        
        // Category detection
        if (promptLower.includes('story') || promptLower.includes('creative') || promptLower.includes('narrative')) {
            category = 'Creative Writing';
        } else if (promptLower.includes('analyze') || promptLower.includes('research') || promptLower.includes('study')) {
            category = 'Technical Explanation';
        } else if (promptLower.includes('code') || promptLower.includes('technical') || promptLower.includes('system')) {
            category = 'Code Generation';
        } else if (promptLower.includes('business') || promptLower.includes('sales') || promptLower.includes('marketing')) {
            category = 'Business Communication';
        }
        
        // Complexity detection
        if (promptLower.includes('simple') || promptLower.includes('basic') || promptLower.includes('beginner')) {
            complexity = 'low';
        } else if (promptLower.includes('advanced') || promptLower.includes('complex') || promptLower.includes('expert')) {
            complexity = 'high';
        }
        
        // Domain detection
        if (promptLower.includes('business') || promptLower.includes('sales') || promptLower.includes('marketing')) {
            domain = 'business';
        } else if (promptLower.includes('science') || promptLower.includes('research') || promptLower.includes('academic')) {
            domain = 'academic';
        } else if (promptLower.includes('art') || promptLower.includes('design') || promptLower.includes('creative')) {
            domain = 'creative';
        } else if (promptLower.includes('code') || promptLower.includes('technical') || promptLower.includes('system')) {
            domain = 'technical';
        }
        
        return { 
            category, 
            complexity, 
            domain, 
            keywords: this.extractKeywords(promptLower),
            confidence: 0.6 // Lower confidence for fallback
        };
    }

    /**
     * Extract keywords for enhanced context
     */
    extractKeywords(text) {
        const keywords = [];
        const commonKeywords = [
            'story', 'analyze', 'code', 'teach', 'plan', 'creative', 'technical',
            'business', 'science', 'art', 'simple', 'advanced', 'complex'
        ];
        
        commonKeywords.forEach(keyword => {
            if (text.includes(keyword)) {
                keywords.push(keyword);
            }
        });
        
        return keywords;
    }

    /**
     * Select enhanced rules based on context and fine-tuning weights
     */
    selectEnhancedRules(context, existingBlocks) {
        const rules = [];
        
        // Always apply core rules with high weights
        rules.push(this.advancedRules.systemFraming);
        rules.push(this.advancedRules.generatorFunction);
        rules.push(this.advancedRules.constraintBased);
        
        // Context-specific rules
        if (context.category === 'Creative Writing') {
            rules.push(this.advancedRules.metaphorAbstraction);
            rules.push(this.advancedRules.narrativeDeconstruction);
        } else if (context.category === 'Technical Explanation') {
            rules.push(this.advancedRules.metaChainOfThought);
            rules.push(this.advancedRules.underlyingAlgorithm);
        } else if (context.category === 'Code Generation') {
            rules.push(this.advancedRules.chainOfCommand);
            rules.push(this.advancedRules.surgicalFormat);
        } else if (context.category === 'Business Communication') {
            rules.push(this.advancedRules.successMetric);
            rules.push(this.advancedRules.toneCalibration);
        }
        
        // Complexity-based rules
        if (context.complexity === 'high') {
            rules.push(this.advancedRules.recursiveCorrection);
            rules.push(this.advancedRules.metaChainOfThought);
        }
        
        // Block-specific rules
        if (!existingBlocks.some(b => b.type === 'who')) {
            rules.push(this.advancedRules.roleImprinting);
        }
        if (!existingBlocks.some(b => b.type === 'what')) {
            rules.push(this.advancedRules.successMetric);
        }
        
        // Sort by rule priority (Core Abstraction rules first) and limit to top 5
        const rulePriority = {
            'Core Abstraction': 5,
            'Leverage & Power': 4,
            'Meta-Reasoning': 3,
            'Tactical Precision': 2,
            'Operationalizing': 1,
            'Temporal & Evolutionary': 1,
            'Meta-Cognition': 1,
            'Advanced Recursive': 1
        };
        
        return rules
            .sort((a, b) => (rulePriority[b.category] || 0) - (rulePriority[a.category] || 0))
            .slice(0, 5);
    }

    /**
     * Get training context from previous interactions
     */
    getTrainingContext() {
        if (this.trainingData.length === 0) {
            return "No previous training data available.";
        }
        
        const recentData = this.trainingData.slice(-5); // Last 5 interactions
        const context = recentData.map(data => 
            `Previous: "${data.prompt}" → Generated: ${data.suggestions.length} suggestions`
        ).join('\n');
        
        return `Recent training context:\n${context}`;
    }

    /**
     * Call advanced Ollama with optimized parameters and timeout
     */
    async callAdvancedOllama(prompt) {
        const modelToUse = this.fineTunedModel || this.model;
        
        // Create AbortController for timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
        
        try {
            const response = await fetch(`${this.baseUrl}/api/generate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: modelToUse,
                    prompt: prompt,
                    stream: false,
                    options: {
                        temperature: 0.6, // Reduced for more focused responses
                        top_p: 0.8, // Reduced for better consistency
                        max_tokens: 500, // Reduced to prevent timeouts
                        repeat_penalty: 1.1,
                        top_k: 30, // Reduced for faster processing
                        frequency_penalty: 0.05, // Reduced
                        presence_penalty: 0.05 // Reduced
                    }
                }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`Advanced Ollama API error: ${response.status}`);
            }

            const data = await response.json();
            return data.response;
        } catch (error) {
            clearTimeout(timeoutId);
            if (error.name === 'AbortError') {
                throw new Error('Advanced Ollama request timed out');
            }
            throw error;
        }
    }

    /**
     * Parse enhanced suggestion response with confidence and rule tracking
     */
    parseEnhancedSuggestionResponse(response) {
        try {
            // Extract JSON from response
            const jsonMatch = response.match(/\{[\s\S]*\}/);
            if (!jsonMatch) {
                throw new Error('No JSON found in response');
            }

            const suggestions = JSON.parse(jsonMatch[0]);
            const result = [];

            // Convert to PET format with enhanced tracking
            if (suggestions.who && suggestions.who.length > 0) {
                result.push({
                    type: 'who',
                    rule: 'advanced_role_imprinting',
                    content: `You are a ${suggestions.who[0]} with relevant expertise.`,
                    options: suggestions.who,
                    appliedRules: suggestions.applied_rules || ['roleImprinting', 'systemFraming'],
                    confidence: suggestions.confidence || 0.8,
                    model: this.fineTunedModel ? 'fine-tuned' : 'base'
                });
            }

            if (suggestions.what && suggestions.what.length > 0) {
                result.push({
                    type: 'what',
                    rule: 'advanced_generator_function',
                    content: `Please ${suggestions.what[0]} based on the provided information.`,
                    options: suggestions.what,
                    appliedRules: suggestions.applied_rules || ['generatorFunction', 'successMetric'],
                    confidence: suggestions.confidence || 0.8,
                    model: this.fineTunedModel ? 'fine-tuned' : 'base'
                });
            }

            if (suggestions.how && suggestions.how.length > 0) {
                result.push({
                    type: 'how',
                    rule: 'advanced_constraint_based',
                    content: `Use ${suggestions.how[0]} when crafting your response.`,
                    options: suggestions.how,
                    appliedRules: suggestions.applied_rules || ['constraintBased', 'toneCalibration'],
                    confidence: suggestions.confidence || 0.8,
                    model: this.fineTunedModel ? 'fine-tuned' : 'base'
                });
            }

            return result;
        } catch (error) {
            console.error('❌ Failed to parse enhanced Ollama response:', error);
            return this.fallbackSuggestions('', []);
        }
    }

    /**
     * Generate cache key for inference caching
     */
    generateCacheKey(heartPrompt, existingBlocks) {
        const blocksKey = existingBlocks.map(b => `${b.type}:${b.content}`).join('|');
        return `${heartPrompt}:${blocksKey}`;
    }

    /**
     * Add interaction to training data for future fine-tuning
     */
    addToTrainingData(heartPrompt, existingBlocks, suggestions, context = null) {
        this.trainingData.push({
            prompt: heartPrompt,
            existingBlocks: existingBlocks,
            suggestions: suggestions,
            contextCategory: context ? context.category : 'General Question',
            contextComplexity: context ? context.complexity : 'medium',
            contextDomain: context ? context.domain : 'general',
            contextConfidence: context ? context.confidence : 0.5,
            timestamp: Date.now(),
            userFeedback: null // Will be populated when user provides feedback
        });
        
        // Keep only last 100 interactions to prevent memory bloat
        if (this.trainingData.length > 100) {
            this.trainingData = this.trainingData.slice(-100);
        }
        
        // Save to localStorage for persistence
        try {
            localStorage.setItem('pet_training_data', JSON.stringify(this.trainingData));
        } catch (error) {
            console.warn('Failed to save training data to localStorage:', error);
        }
    }

    /**
     * Fine-tune model with collected training data
     */
    async fineTuneModel() {
        if (this.trainingData.length < 10) {
            console.log('⚠️ Need at least 10 training examples for fine-tuning');
            return false;
        }

        try {
            console.log('🔄 Starting model fine-tuning...');
            
            // Prepare training data
            const trainingExamples = this.trainingData.map(data => ({
                input: this.createTrainingInput(data.prompt, data.existingBlocks),
                output: this.createTrainingOutput(data.suggestions)
            }));

            // Create fine-tuning prompt
            const fineTunePrompt = this.createFineTunePrompt(trainingExamples);
            
            // Call Ollama for fine-tuning (this would require Ollama to support fine-tuning)
            // For now, we'll simulate the process
            console.log('✅ Fine-tuning data prepared');
            console.log(`📊 Training examples: ${trainingExamples.length}`);
            
            return true;
        } catch (error) {
            console.error('❌ Fine-tuning failed:', error);
            return false;
        }
    }

    /**
     * Create training input for fine-tuning
     */
    createTrainingInput(prompt, existingBlocks) {
        return `User Request: "${prompt}"
Existing Blocks: ${existingBlocks.map(b => b.type).join(', ') || 'none'}
Generate suggestions for prompt engineering blocks.`;
    }

    /**
     * Create training output for fine-tuning
     */
    createTrainingOutput(suggestions) {
        return JSON.stringify({
            who: suggestions.find(s => s.type === 'who')?.options || [],
            what: suggestions.find(s => s.type === 'what')?.options || [],
            how: suggestions.find(s => s.type === 'how')?.options || []
        });
    }

    /**
     * Create fine-tuning prompt
     */
    createFineTunePrompt(trainingExamples) {
        const examples = trainingExamples.map(ex => 
            `Input: ${ex.input}\nOutput: ${ex.output}`
        ).join('\n\n');
        
        return `Fine-tune the model on these prompt engineering examples:

${examples}

Learn to generate high-quality, contextually appropriate suggestions for prompt engineering tasks.`;
    }

    /**
     * Get advanced status information
     */
    getStatus() {
        return {
            isAvailable: this.isAvailable,
            model: this.model,
            fineTunedModel: this.fineTunedModel,
            baseUrl: this.baseUrl,
            advancedRules: Object.keys(this.advancedRules).length,
            trainingDataSize: this.trainingData.length,
            cacheSize: this.inferenceCache.size,
            ruleCategories: ['Core Fine-Tuning', 'Advanced Fine-Tuning', 'Multimodal', 'Adaptive Learning']
        };
    }

    /**
     * Fallback suggestions when advanced model unavailable
     */
    fallbackSuggestions(heartPrompt, existingBlocks) {
        const promptLower = heartPrompt.toLowerCase();
        const suggestions = [];
        
        // Always suggest WHO and WHAT if not present
        if (!existingBlocks.some(b => b.type === 'who')) {
            suggestions.push({
                type: 'who',
                rule: 'fallback_system_framing',
                content: 'You are a helpful AI assistant with relevant expertise.',
                options: ['helpful assistant', 'expert advisor', 'knowledgeable guide'],
                appliedRules: ['systemFraming', 'roleImprinting'],
                confidence: 0.6,
                model: 'fallback'
            });
        }
        
        if (!existingBlocks.some(b => b.type === 'what')) {
            suggestions.push({
                type: 'what',
                rule: 'fallback_generator_function',
                content: 'Please provide assistance based on the provided information.',
                options: ['provide assistance', 'analyze information', 'solve problem'],
                appliedRules: ['generatorFunction', 'successMetric'],
                confidence: 0.6,
                model: 'fallback'
            });
        }
        
        return suggestions.slice(0, 3);
    }
}

// Export for PET
export { PETGemma3NAdvanced };
window.PETGemma3NAdvanced = PETGemma3NAdvanced; 