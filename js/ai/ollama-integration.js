/**
 * PET Ollama Integration
 * Connects to local Gemma 3N model via Ollama HTTP API
 * Enhanced with 38 Advanced Prompt Engineering Rules
 */

import { ADVANCED_RULES } from './advanced-rules.js';

class PETOllamaIntegration {
    constructor() {
        this.baseUrl = 'http://localhost:11434';
        this.model = 'pet-gemma3-light';  // 🚀 LIGHTWEIGHT: Using Gemma 3 1B for fastest performance
        this.fallbackModel = 'pet-enhanced';  // Fallback to fine-tuned model if light not available
        this.isAvailable = false;
        this.isSpecialized = false;
        this.advancedRules = ADVANCED_RULES;
        this.testConnection();
    }

    /**
     * Test connection to Ollama and check for specialized model
     */
    async testConnection() {
        try {
            const response = await fetch(`${this.baseUrl}/api/tags`);
            if (response.ok) {
                this.isAvailable = true;
                
                // Check for specialized model
                const data = await response.json();
                const models = data.models || [];
                this.isSpecialized = models.some(model => 
                    model.name.includes('pet-gemma3-light')
                );
                
                if (this.isSpecialized) {
                    console.log('🚀 PET Lightweight model available - Fast mode activated!');
                } else {
                    console.log('✅ Ollama connection successful - Using fallback model');
                    this.model = this.fallbackModel;
                }
            } else {
                console.warn('⚠️ Ollama not available, using fallback');
            }
        } catch (error) {
            console.warn('⚠️ Ollama not available, using fallback:', error.message);
        }
    }

    /**
     * Generate suggestions using Gemma 3N with advanced rules
     */
    async generateSuggestions(heartPrompt, existingBlocks = []) {
        if (!this.isAvailable) {
            return this.fallbackSuggestions(heartPrompt, existingBlocks);
        }

        try {
            const prompt = this.createAdvancedSuggestionPrompt(heartPrompt, existingBlocks);
            const response = await this.callOllama(prompt);
            return this.parseSuggestionResponse(response);
        } catch (error) {
            console.error('❌ Ollama API error:', error);
            return this.fallbackSuggestions(heartPrompt, existingBlocks);
        }
    }

    /**
     * Create advanced suggestion prompt using the 38 rules
     */
    createAdvancedSuggestionPrompt(heartPrompt, existingBlocks) {
        const existingTypes = existingBlocks.map(b => b.type).join(', ');
        const context = this.analyzeContext(heartPrompt);
        
        // Apply relevant rules based on context
        const appliedRules = this.selectRelevantRules(context, existingBlocks);
        
        return `<start_of_turn>user
You are an advanced prompt engineering assistant using 38 sophisticated rules for optimal AI interaction.

CONTEXT ANALYSIS:
User Request: "${heartPrompt}"
Existing Blocks: ${existingTypes || 'none'}
Context Category: ${context.category}

APPLIED RULES:
${appliedRules.map(rule => `- ${rule.name}: ${rule.description}`).join('\n')}

TASK:
Generate 3-4 short options (5-7 words each) for these categories:
WHO: (who should the AI be?)
WHAT: (what should it do?)
HOW: (how should it respond?)

Use the applied rules to ensure:
- System framing for clear structure
- Generator function specification for process clarity
- Constraint-based generation for focused outputs
- Role-based imprinting for powerful personas
- Success metric definition for quality alignment

Format as JSON:
{
  "who": ["option1", "option2", "option3"],
  "what": ["option1", "option2", "option3"], 
  "how": ["option1", "option2", "option3"]
}

Only return valid JSON, no other text.
<end_of_turn>
<start_of_turn>model
`;
    }

    /**
     * Select relevant rules based on context and existing blocks
     */
    selectRelevantRules(context, existingBlocks) {
        const rules = [];
        
        // Always apply core rules
        rules.push(this.advancedRules.systemFraming);
        rules.push(this.advancedRules.generatorFunction);
        rules.push(this.advancedRules.constraintBased);
        
        // Context-specific rules
        if (context.category === 'creative') {
            rules.push(this.advancedRules.metaphorAbstraction);
            rules.push(this.advancedRules.narrativeDeconstruction);
        } else if (context.category === 'analytical') {
            rules.push(this.advancedRules.metaChainOfThought);
            rules.push(this.advancedRules.underlyingAlgorithm);
        } else if (context.category === 'technical') {
            rules.push(this.advancedRules.chainOfCommand);
            rules.push(this.advancedRules.surgicalFormat);
        }
        
        // Block-specific rules
        if (!existingBlocks.some(b => b.type === 'who')) {
            rules.push(this.advancedRules.roleImprinting);
        }
        if (!existingBlocks.some(b => b.type === 'what')) {
            rules.push(this.advancedRules.successMetric);
        }
        if (!existingBlocks.some(b => b.type === 'dont')) {
            rules.push(this.advancedRules.negativeConstraints);
        }
        
        return rules.slice(0, 5); // Limit to top 5 most relevant
    }

    /**
     * Analyze context for rule selection
     */
    analyzeContext(heartPrompt) {
        const promptLower = heartPrompt.toLowerCase();
        
        if (promptLower.includes('story') || promptLower.includes('creative') || promptLower.includes('narrative')) {
            return { category: 'creative', keywords: ['story', 'creative', 'narrative'] };
        } else if (promptLower.includes('analyze') || promptLower.includes('research') || promptLower.includes('study')) {
            return { category: 'analytical', keywords: ['analyze', 'research', 'study'] };
        } else if (promptLower.includes('code') || promptLower.includes('technical') || promptLower.includes('system')) {
            return { category: 'technical', keywords: ['code', 'technical', 'system'] };
        } else if (promptLower.includes('teach') || promptLower.includes('explain') || promptLower.includes('educate')) {
            return { category: 'educational', keywords: ['teach', 'explain', 'educate'] };
        } else if (promptLower.includes('plan') || promptLower.includes('strategy') || promptLower.includes('organize')) {
            return { category: 'planning', keywords: ['plan', 'strategy', 'organize'] };
        } else {
            return { category: 'general', keywords: ['general', 'assist', 'help'] };
        }
    }

    /**
     * Call Ollama API with advanced parameters
     */
    async callOllama(prompt) {
        const response = await fetch(`${this.baseUrl}/api/generate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: this.model,
                prompt: prompt,
                stream: false,
                options: {
                    temperature: 0.4,      // ⚡ OPTIMIZED: Reduced for speed and focus
                    top_p: 0.85,           // ⚡ OPTIMIZED: More focused responses  
                    max_tokens: 200,       // ⚡ OPTIMIZED: 4x faster token generation
                    repeat_penalty: 1.1,
                    top_k: 40
                }
            })
        });

        if (!response.ok) {
            throw new Error(`Ollama API error: ${response.status}`);
        }

        const data = await response.json();
        return data.response;
    }

    /**
     * Parse suggestion response from Gemma with rule tracking
     */
    parseSuggestionResponse(response) {
        try {
            // Extract JSON from response
            const jsonMatch = response.match(/\{[\s\S]*\}/);
            if (!jsonMatch) {
                throw new Error('No JSON found in response');
            }

            const suggestions = JSON.parse(jsonMatch[0]);
            const result = [];

            // Convert to PET format with rule tracking
            if (suggestions.who && suggestions.who.length > 0) {
                result.push({
                    type: 'who',
                    rule: 'advanced_role_imprinting',
                    content: `You are a ${suggestions.who[0]} with relevant expertise.`,
                    options: suggestions.who,
                    appliedRules: ['roleImprinting', 'systemFraming']
                });
            }

            if (suggestions.what && suggestions.what.length > 0) {
                result.push({
                    type: 'what',
                    rule: 'advanced_generator_function',
                    content: `Please ${suggestions.what[0]} based on the provided information.`,
                    options: suggestions.what,
                    appliedRules: ['generatorFunction', 'successMetric']
                });
            }

            if (suggestions.how && suggestions.how.length > 0) {
                result.push({
                    type: 'how',
                    rule: 'advanced_constraint_based',
                    content: `Use ${suggestions.how[0]} when crafting your response.`,
                    options: suggestions.how,
                    appliedRules: ['constraintBased', 'toneCalibration']
                });
            }

            return result;
        } catch (error) {
            console.error('❌ Failed to parse Ollama response:', error);
            return this.fallbackSuggestions('', []);
        }
    }

    /**
     * Generate block content using advanced rules
     */
    async generateBlockContent(blockType, context, options = {}) {
        if (!this.isAvailable) {
            return this.fallbackBlockContent(blockType, context);
        }

        try {
            const prompt = this.createAdvancedBlockContentPrompt(blockType, context);
            const response = await this.callOllama(prompt);
            return this.parseBlockContent(response, blockType);
        } catch (error) {
            console.error('❌ Ollama block generation error:', error);
            return this.fallbackBlockContent(blockType, context);
        }
    }

    /**
     * Create advanced block content prompt using relevant rules
     */
    createAdvancedBlockContentPrompt(blockType, context) {
        const contextAnalysis = this.analyzeContext(context);
        const relevantRules = this.selectRelevantRules(contextAnalysis, []);
        
        const ruleInstructions = relevantRules.map(rule => 
            `- ${rule.name}: ${rule.description}`
        ).join('\n');

        const blockPrompts = {
            who: `Generate a role definition using advanced prompt engineering rules.
                 Context: "${context}"
                 
                 Applied Rules:
                 ${ruleInstructions}
                 
                 Format: "You are a [role] with [expertise] who [capabilities]."
                 Ensure the role is specific, powerful, and contextually relevant.`,
            
            what: `Generate an action specification using advanced prompt engineering rules.
                   Context: "${context}"
                   
                   Applied Rules:
                   ${ruleInstructions}
                   
                   Format: "Please [action] by [method] to [goal]."
                   Make it specific, actionable, and process-oriented.`,
            
            dont: `Generate constraint specifications using advanced prompt engineering rules.
                   Context: "${context}"
                   
                   Applied Rules:
                   ${ruleInstructions}
                   
                   Format: "Important: [avoidance] in your response."
                   Focus on safety, quality, and specific constraints.`,
            
            how: `Generate response style specifications using advanced prompt engineering rules.
                  Context: "${context}"
                  
                  Applied Rules:
                  ${ruleInstructions}
                  
                  Format: "Use [style/format] when crafting your response."
                  Consider tone, structure, and communication style.`,
            
            think: `Generate thinking process specifications using advanced prompt engineering rules.
                    Context: "${context}"
                    
                    Applied Rules:
                    ${ruleInstructions}
                    
                    Format: "Think through this using [approach] to ensure [quality]."
                    Emphasize reasoning methodology and quality assurance.`,
            
            show: `Generate example specifications using advanced prompt engineering rules.
                   Context: "${context}"
                   
                   Applied Rules:
                   ${ruleInstructions}
                   
                   Format: "Include [examples] to illustrate your points."
                   Focus on practical demonstrations and clarity.`,
            
            use: `Generate content usage specifications using advanced prompt engineering rules.
                  Context: "${context}"
                  
                  Applied Rules:
                  ${ruleInstructions}
                  
                  Format: "Work with the following [content type] provided by the user."
                  Emphasize user input processing and integration.`
        };

        return `<start_of_turn>user
${blockPrompts[blockType] || blockPrompts.what}

Return only the formatted response, no additional text.
<end_of_turn>
<start_of_turn>model
`;
    }

    /**
     * Parse block content from Gemma response
     */
    parseBlockContent(response, blockType) {
        // Clean up response
        let content = response.trim();
        
        // Remove quotes if present
        if (content.startsWith('"') && content.endsWith('"')) {
            content = content.slice(1, -1);
        }
        
        // Ensure proper formatting
        if (!content.endsWith('.')) {
            content += '.';
        }
        
        return content;
    }

    /**
     * Validate prompt using advanced rules
     */
    async validatePrompt(blocks) {
        if (!this.isAvailable) {
            return this.fallbackValidation(blocks);
        }

        try {
            const prompt = this.createAdvancedValidationPrompt(blocks);
            const response = await this.callOllama(prompt);
            return this.parseValidationResponse(response, blocks);
        } catch (error) {
            console.error('❌ Ollama validation error:', error);
            return this.fallbackValidation(blocks);
        }
    }

    /**
     * Create advanced validation prompt using the 38 rules
     */
    createAdvancedValidationPrompt(blocks) {
        const promptText = blocks.map(b => `${b.type}: ${b.content}`).join('\n');
        
        return `<start_of_turn>user
You are an expert prompt engineer evaluating this prompt using 38 advanced rules:

"${promptText}"

EVALUATION CRITERIA (based on advanced rules):
1. System Framing (25 points): Is the problem framed as a system with clear inputs, processes, outputs?
2. Generator Function (25 points): Are specific processes and methods defined?
3. Constraint-Based Design (25 points): Are appropriate constraints and avoidances specified?
4. Role & Context Alignment (25 points): Is the role appropriate and contextually relevant?

Rate from 0-100 and provide specific feedback on rule compliance.

Return format:
{
  "score": [0-100],
  "feedback": ["feedback1", "feedback2", "feedback3"],
  "ruleCompliance": {
    "systemFraming": true/false,
    "generatorFunction": true/false,
    "constraintBased": true/false,
    "roleAlignment": true/false
  }
}
<end_of_turn>
<start_of_turn>model
`;
    }

    /**
     * Parse validation response with advanced rule compliance
     */
    parseValidationResponse(response, blocks) {
        try {
            // Extract JSON from response
            const jsonMatch = response.match(/\{[\s\S]*\}/);
            if (!jsonMatch) {
                throw new Error('No JSON found in validation response');
            }

            const validation = JSON.parse(jsonMatch[0]);
            const score = Math.max(0, Math.min(100, validation.score || 50));
            
            return {
                score: score,
                feedback: validation.feedback || this.generateFeedback(score, blocks),
                ruleCompliance: validation.ruleCompliance || this.analyzeRuleCompliance(blocks),
                advancedRules: true
            };
        } catch (error) {
            console.error('❌ Failed to parse validation response:', error);
            return this.fallbackValidation(blocks);
        }
    }

    /**
     * Generate feedback based on score and advanced rules
     */
    generateFeedback(score, blocks) {
        const feedback = [];
        
        if (score >= 80) {
            feedback.push('✅ Excellent prompt structure with advanced rule compliance');
            feedback.push('✅ Clear system framing and generator function specification');
            feedback.push('✅ Strong constraint-based design and role alignment');
        } else if (score >= 60) {
            feedback.push('✅ Good prompt foundation with some advanced rule application');
            feedback.push('⚠️ Consider enhancing system framing and process specification');
            feedback.push('⚠️ Add more specific constraints and role definition');
        } else if (score >= 40) {
            feedback.push('⚠️ Basic prompt structure, needs advanced rule integration');
            feedback.push('⚠️ Implement system framing and generator function specification');
            feedback.push('⚠️ Add constraint-based design and role-based imprinting');
        } else {
            feedback.push('⚠️ Prompt needs significant improvement with advanced rules');
            feedback.push('⚠️ Implement all core advanced rules: system framing, generator function, constraints, role');
            feedback.push('⚠️ Consider using metaphor abstraction and meta-reasoning techniques');
        }
        
        return feedback;
    }

    /**
     * Analyze rule compliance with advanced rules
     */
    analyzeRuleCompliance(blocks) {
        const compliance = {
            systemFrame: blocks.some(b => b.content.includes('You are') || b.content.includes('system')),
            generatorFunction: blocks.some(b => b.content.includes('Please') || b.content.includes('using')),
            constraints: blocks.some(b => b.content.includes('Avoid') || b.content.includes('Important') || b.content.includes('constraint')),
            role: blocks.some(b => b.type === 'who'),
            process: blocks.some(b => b.type === 'what'),
            advancedRules: blocks.some(b => b.appliedRules && b.appliedRules.length > 0)
        };
        
        return compliance;
    }

    /**
     * Fallback suggestions when Ollama unavailable
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
                appliedRules: ['systemFraming', 'roleImprinting']
            });
        }
        
        if (!existingBlocks.some(b => b.type === 'what')) {
            suggestions.push({
                type: 'what',
                rule: 'fallback_generator_function',
                content: 'Please provide assistance based on the provided information.',
                options: ['provide assistance', 'analyze information', 'solve problem'],
                appliedRules: ['generatorFunction', 'successMetric']
            });
        }
        
        // Context-based suggestions with advanced rules
        if (promptLower.includes('story') || promptLower.includes('creative')) {
            if (!existingBlocks.some(b => b.type === 'how')) {
                suggestions.push({
                    type: 'how',
                    rule: 'fallback_metaphor_abstraction',
                    content: 'Use engaging and creative language when crafting your response.',
                    options: ['creative language', 'engaging style', 'vivid descriptions'],
                    appliedRules: ['metaphorAbstraction', 'toneCalibration']
                });
            }
        }
        
        return suggestions.slice(0, 3);
    }

    /**
     * Fallback block content with advanced rule awareness
     */
    fallbackBlockContent(blockType, context) {
        const fallbacks = {
            who: 'You are a helpful AI assistant with expertise in this area.',
            what: 'Please provide assistance with your request.',
            dont: 'Important: Avoid harmful or inappropriate content.',
            how: 'Use clear and helpful language in your response.',
            think: 'Think through this step by step to ensure quality.',
            show: 'Include relevant examples to illustrate your points.',
            use: 'Work with the information provided by the user.'
        };
        
        return fallbacks[blockType] || fallbacks.what;
    }

    /**
     * Fallback validation with advanced rule awareness
     */
    fallbackValidation(blocks) {
        let score = 0;
        const feedback = [];
        
        // Basic scoring with advanced rule awareness
        if (blocks.some(b => b.type === 'who')) score += 20;
        if (blocks.some(b => b.type === 'what')) score += 20;
        if (blocks.some(b => b.type === 'dont')) score += 15;
        if (blocks.some(b => b.type === 'how')) score += 15;
        
        // Content quality with advanced rule detection
        const customContent = blocks.filter(b => !b.content.includes('[') && b.content.length > 30);
        score += Math.min(30, customContent.length * 7);
        
        if (score >= 60) {
            feedback.push('✅ Good prompt structure (fallback mode)');
        } else {
            feedback.push('⚠️ Needs improvement (fallback mode)');
        }
        
        return {
            score: Math.min(100, score),
            feedback,
            ruleCompliance: this.analyzeRuleCompliance(blocks),
            advancedRules: false
        };
    }

    /**
     * Get integration status with advanced rules info
     */
    getStatus() {
        return {
            isAvailable: this.isAvailable,
            model: this.model,
            baseUrl: this.baseUrl,
            advancedRules: Object.keys(this.advancedRules).length,
            ruleCategories: ['Core Abstraction', 'Leverage & Power', 'Temporal & Evolutionary', 'Meta-Reasoning', 'Tactical Precision', 'Operationalizing', 'Meta-Cognition', 'Advanced Recursive']
        };
    }
}

// Export for PET
export { PETOllamaIntegration };
window.PETOllamaIntegration = PETOllamaIntegration;