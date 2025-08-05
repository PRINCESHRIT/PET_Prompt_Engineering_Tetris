/**
 * PET Ollama Integration
 * Connects to local Gemma 3N model via Ollama HTTP API
 * Enhanced with 38 Advanced Prompt Engineering Rules
 */

class PETOllamaIntegration {
    constructor() {
        this.baseUrl = 'http://localhost:11434';
        this.model = 'gemma3:4b';
        this.isAvailable = false;
        this.advancedRules = this.initializeAdvancedRules();
        this.testConnection();
    }

    /**
     * Initialize the 38 Advanced Prompt Engineering Rules
     */
    initializeAdvancedRules() {
        return {
            // 1. Core Abstraction & Compression
            systemFraming: {
                name: "System Framing",
                description: "Frame the problem as a system with inputs, processes, and outputs",
                template: "Define this as a system with inputs: {inputs}, processes: {processes}, outputs: {outputs}"
            },
            generatorFunction: {
                name: "Generator Function Specification",
                description: "Specify the underlying process to create outcomes",
                template: "Generate {outcome} using {framework} where {constraint} is the key factor"
            },
            metaphorAbstraction: {
                name: "Metaphor as Abstraction Layer",
                description: "Map complex problems to simple metaphors",
                template: "Act as {metaphor} to approach this problem: {context}"
            },
            constraintBased: {
                name: "Constraint-Based Generation",
                description: "Define what the output cannot be",
                template: "Generate {output} while avoiding: {constraints}"
            },
            metaChainOfThought: {
                name: "Meta-Level Chain of Thought",
                description: "Reason through reasoning process",
                template: "Explain your reasoning steps and why you chose this approach over alternatives"
            },

            // 2. Leverage & Power Dynamics
            leverageWords: {
                name: "Leverage Words",
                description: "Use terms that force specific operation modes",
                template: "Use {leverage_word} when {action} to ensure {outcome}"
            },
            informationFlow: {
                name: "Information Flow Control",
                description: "Explicitly control what to consider and ignore",
                template: "Focus only on {focus_areas}; disregard {ignore_areas}"
            },
            roleImprinting: {
                name: "Role-Based Imprinting",
                description: "Assign specific, powerful personas",
                template: "You are {role} with {background} who {capabilities}"
            },
            successMetric: {
                name: "Success Metric Definition",
                description: "Define how responses will be judged",
                template: "The best answer is one that is {criteria} and contains {requirements}"
            },
            contextualDatabase: {
                name: "Contextual Database Pre-loading",
                description: "Provide curated facts before main query",
                template: "Given these facts: {facts}, now {main_query}"
            },

            // 3. Temporal & Evolutionary Thinking
            futureStates: {
                name: "Future States Projection",
                description: "Project trends and future possibilities",
                template: "Given {current_state}, what are {number} plausible scenarios for {timeframe}?"
            },
            recursiveCorrection: {
                name: "Recursive Self-Correction",
                description: "Critique and improve previous outputs",
                template: "Review your response. Identify {number} weaknesses and generate an improved version"
            },
            simulationFraming: {
                name: "Simulation Framing",
                description: "Treat as simulator for complex systems",
                template: "Simulate {system} where {change} occurs. Describe the {timeframe} of change"
            },
            counterfactualAnalysis: {
                name: "Counterfactual Analysis",
                description: "Explore 'what if' scenarios",
                template: "What would be the outcome if {scenario} had been different?"
            },
            phaseChange: {
                name: "Phase Change Identification",
                description: "Identify tipping points and transformations",
                template: "Identify the conditions under which {system} would undergo fundamental transformation"
            },

            // 4. Meta-Reasoning & Symmetries
            crossDomainSymmetry: {
                name: "Cross-Domain Symmetry",
                description: "Map patterns across domains",
                template: "Explain how {concept1} from {domain1} applies to {concept2} in {domain2}"
            },
            narrativeDeconstruction: {
                name: "Narrative Arc Deconstruction",
                description: "Break down into core components",
                template: "Deconstruct this into: protagonist ({protagonist}), antagonist ({antagonist}), conflict ({conflict}), resolution ({resolution})"
            },
            underlyingAlgorithm: {
                name: "Underlying Algorithm Discovery",
                description: "Propose generative algorithms",
                template: "What is the computational logic behind {phenomenon}?"
            },
            minimumViableModel: {
                name: "Minimum Viable Model",
                description: "Simplify to essential form",
                template: "Explain {complex_concept} using only {constraints} to force high-level compression"
            },
            selfReferentialLoops: {
                name: "Self-Referential Loop Analysis",
                description: "Identify feedback loops",
                template: "Describe the feedback loop between {element1} and {element2} in {system}"
            },

            // 5. Tactical Precision & Asymmetric Advantage
            negativeConstraints: {
                name: "Negative Constraint Refinement",
                description: "Use negative constraints to refine output",
                template: "Generate {output} that avoids: {negative_constraints}"
            },
            multiVariatePrompting: {
                name: "Multi-Variate Prompting",
                description: "Combine multiple non-obvious constraints",
                template: "Generate {output} that is both {constraint1} and {constraint2}, while avoiding {avoidance}"
            },
            uncertaintyAcknowledgment: {
                name: "Uncertainty Acknowledgment",
                description: "Force acknowledgment of uncertainty",
                template: "What is the most likely outcome, and what is the probability of {failure_scenario}?"
            },
            surgicalFormat: {
                name: "Surgical Format Precision",
                description: "Pre-define output format with precision",
                template: "Create {format} with columns: {columns}. Ensure {requirements}"
            },
            antiPattern: {
                name: "Anti-Pattern Rule",
                description: "Actively avoid specific styles or mistakes",
                template: "Do not use {anti_patterns}. Instead, use {preferred_style}"
            },

            // 6. Operationalizing the Process
            chainOfCommand: {
                name: "Chain of Command",
                description: "Break into sequential steps",
                template: "Step 1: {step1}. Step 2: {step2}. Step 3: {step3}"
            },
            preMortem: {
                name: "Pre-Mortem Analysis",
                description: "Assume failure and work backward",
                template: "Assume {project} fails. What were the {number} most likely reasons for failure?"
            },
            devilsAdvocate: {
                name: "Devil's Advocate Role",
                description: "Argue against own conclusion",
                template: "Provide {number} strong arguments against the solution you just proposed"
            },
            dynamicParameterization: {
                name: "Dynamic Parameterization",
                description: "Create function-like prompts",
                template: "Given {items}, categorize them into {categories} based on {principle}"
            },
            redTeamAnalysis: {
                name: "Red Team Analysis",
                description: "Think like an adversary",
                template: "If you were a competitor, what would be the most effective way to disrupt {target}?"
            },

            // 7. Meta-Cognition & Calibration
            confidenceJustification: {
                name: "Confidence Justification",
                description: "Justify own confidence level",
                template: "On a scale of 1-10, how confident are you in this answer, and why?"
            },
            toneCalibration: {
                name: "Tone and Voice Calibration",
                description: "Define specific tone and voice",
                template: "Respond in the style of {style} with {characteristics}"
            },
            unknownUnknowns: {
                name: "Unknown Unknowns",
                description: "Identify missing information",
                template: "What crucial data is absent that, if included, would change the conclusion?"
            },
            fiveWhys: {
                name: "Five Whys Technique",
                description: "Ask why recursively",
                template: "For this answer, ask 'Why?' five times to reach the root cause"
            },
            linguisticScaffolding: {
                name: "Linguistic Scaffolding",
                description: "Use sentence structures to guide responses",
                template: "The core tension lies between {element1} and {element2}. Explain the dynamics of this tension"
            },

            // 8. Advanced Recursive Techniques
            promptGeneration: {
                name: "Prompt Generation",
                description: "Generate the next prompt",
                template: "Based on your output, generate the most effective follow-up prompt to continue this inquiry"
            },
            treeOfThoughts: {
                name: "Tree of Thoughts",
                description: "Generate multiple solution paths",
                template: "Generate {number} distinct strategies. Evaluate each on {metric}. Expand on the highest-rated strategy"
            },
            reflectivePrompting: {
                name: "Reflective Prompting",
                description: "Re-contextualize with new information",
                template: "Given new information: {new_info}, re-evaluate your previous conclusion and explain the change"
            }
        };
    }

    /**
     * Test connection to Ollama
     */
    async testConnection() {
        try {
            const response = await fetch(`${this.baseUrl}/api/tags`);
            if (response.ok) {
                this.isAvailable = true;
                console.log('✅ Ollama connection successful');
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
                    temperature: 0.7,
                    top_p: 0.9,
                    max_tokens: 800,
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
window.PETOllamaIntegration = PETOllamaIntegration;