/**
 * PET AI Engine - Rule-Based Text Generation
 * Implements 35 prompt engineering rules for automatic suggestion generation
 */

class PETAIEngine {
    constructor() {
        this.rules = this.initializeRules();
        this.context = {};
    }

    /**
     * Initialize core prompt engineering rules
     */
    initializeRules() {
        return {
            // Core Rules (1-5)
            systemFrame: {
                name: "System Framing",
                template: "You are a {role} analyzing {input}. Process through {method} to produce {output}."
            },
            generatorFunction: {
                name: "Generator Function", 
                template: "Generate {output} using {framework} where {constraint}."
            },
            metaphor: {
                name: "Metaphor Abstraction",
                template: "Act as {metaphor} to {task}."
            },
            constraints: {
                name: "Constraint-Based",
                template: "Avoid {forbidden} while {task}."
            },
            chainOfThought: {
                name: "Meta Chain of Thought",
                template: "Think step-by-step: {steps}. Explain your reasoning."
            },

            // Power Rules (6-10)
            leverage: {
                name: "Leverage Words",
                template: "{leverage_word} analyze {subject} with {approach}."
            },
            focus: {
                name: "Information Control",
                template: "Focus only on {context}. Ignore {irrelevant}."
            },
            role: {
                name: "Role Imprinting",
                template: "You are {role} with expertise in {domain}."
            },
            success: {
                name: "Success Metrics",
                template: "The best answer is {criteria}."
            },
            context: {
                name: "Context Loading",
                template: "Background: {facts}. Given this, {task}."
            }
        };
    }

    /**
     * Generate AI suggestions based on heart prompt
     */
    async generateSuggestions(heartPrompt, existingBlocks = []) {
        const context = this.analyzeContext(heartPrompt);
        const suggestions = [];

        // Generate WHO block (System Framing + Role)
        if (!existingBlocks.some(b => b.type === 'who')) {
            suggestions.push({
                type: 'who',
                rule: 'systemFrame',
                content: this.applyRule('systemFrame', {
                    role: context.suggestedRole,
                    input: heartPrompt,
                    method: context.suggestedMethod,
                    output: context.suggestedOutput
                })
            });
        }

        // Generate WHAT block (Generator Function)
        if (!existingBlocks.some(b => b.type === 'what')) {
            suggestions.push({
                type: 'what',
                rule: 'generatorFunction',
                content: this.applyRule('generatorFunction', {
                    output: context.suggestedOutput,
                    framework: context.suggestedFramework,
                    constraint: context.suggestedConstraint
                })
            });
        }

        // Generate DON'T block (Constraints)
        if (!existingBlocks.some(b => b.type === 'dont')) {
            suggestions.push({
                type: 'dont',
                rule: 'constraints',
                content: this.applyRule('constraints', {
                    forbidden: context.suggestedForbidden,
                    task: context.suggestedTask
                })
            });
        }

        // Generate HOW block (Focus + Success)
        if (!existingBlocks.some(b => b.type === 'how')) {
            suggestions.push({
                type: 'how',
                rule: 'focus',
                content: this.applyRule('focus', {
                    context: context.suggestedContext,
                    irrelevant: context.suggestedIrrelevant
                })
            });
        }

        // Generate THINK block (Chain of Thought)
        if (!existingBlocks.some(b => b.type === 'think')) {
            suggestions.push({
                type: 'think',
                rule: 'chainOfThought',
                content: this.applyRule('chainOfThought', {
                    steps: context.suggestedSteps
                })
            });
        }

        return suggestions.slice(0, 3);
    }

    /**
     * Analyze context from heart prompt
     */
    analyzeContext(heartPrompt) {
        const promptLower = heartPrompt.toLowerCase();
        
        // Determine category
        let category = 'general';
        if (promptLower.includes('story') || promptLower.includes('creative')) {
            category = 'creative';
        } else if (promptLower.includes('analyze') || promptLower.includes('data')) {
            category = 'analytical';
        } else if (promptLower.includes('explain') || promptLower.includes('teach')) {
            category = 'educational';
        } else if (promptLower.includes('code') || promptLower.includes('debug')) {
            category = 'technical';
        } else if (promptLower.includes('plan') || promptLower.includes('organize')) {
            category = 'planning';
        }

        return this.getContextualData(category, heartPrompt);
    }

    /**
     * Get contextual data based on category
     */
    getContextualData(category, heartPrompt) {
        const contexts = {
            creative: {
                suggestedRole: 'creative storyteller',
                suggestedMethod: 'narrative framework',
                suggestedOutput: 'engaging story',
                suggestedFramework: 'Hero\'s Journey',
                suggestedConstraint: 'emotional resonance',
                suggestedForbidden: 'clichés and predictable endings',
                suggestedTask: 'crafting compelling narratives',
                suggestedContext: 'story elements and character development',
                suggestedIrrelevant: 'technical jargon and formal language',
                suggestedSteps: 'character development, plot progression, emotional climax'
            },
            analytical: {
                suggestedRole: 'data analyst',
                suggestedMethod: 'systematic analysis',
                suggestedOutput: 'insightful analysis',
                suggestedFramework: 'data-driven approach',
                suggestedConstraint: 'evidence-based conclusions',
                suggestedForbidden: 'speculation without data',
                suggestedTask: 'analyzing patterns and trends',
                suggestedContext: 'data patterns and statistical insights',
                suggestedIrrelevant: 'emotional opinions and speculation',
                suggestedSteps: 'data collection, pattern identification, conclusion drawing'
            },
            educational: {
                suggestedRole: 'patient teacher',
                suggestedMethod: 'progressive learning',
                suggestedOutput: 'clear explanation',
                suggestedFramework: 'scaffolded learning',
                suggestedConstraint: 'accessibility',
                suggestedForbidden: 'jargon and assumptions',
                suggestedTask: 'explaining complex concepts',
                suggestedContext: 'learning objectives and key concepts',
                suggestedIrrelevant: 'advanced topics and technical details',
                suggestedSteps: 'foundation building, concept introduction, practical application'
            },
            technical: {
                suggestedRole: 'software engineer',
                suggestedMethod: 'systematic debugging',
                suggestedOutput: 'working solution',
                suggestedFramework: 'problem-solving methodology',
                suggestedConstraint: 'best practices',
                suggestedForbidden: 'unsafe code and deprecated methods',
                suggestedTask: 'solving technical problems',
                suggestedContext: 'technical requirements and constraints',
                suggestedIrrelevant: 'business details and user preferences',
                suggestedSteps: 'problem identification, solution design, implementation'
            },
            planning: {
                suggestedRole: 'strategic planner',
                suggestedMethod: 'systematic organization',
                suggestedOutput: 'actionable plan',
                suggestedFramework: 'project management',
                suggestedConstraint: 'feasibility',
                suggestedForbidden: 'unrealistic timelines and vague objectives',
                suggestedTask: 'creating organized plans',
                suggestedContext: 'project goals and requirements',
                suggestedIrrelevant: 'implementation details and technical specs',
                suggestedSteps: 'goal setting, resource planning, timeline creation'
            },
            general: {
                suggestedRole: 'helpful assistant',
                suggestedMethod: 'systematic approach',
                suggestedOutput: 'useful response',
                suggestedFramework: 'problem-solving',
                suggestedConstraint: 'clarity and accuracy',
                suggestedForbidden: 'confusion and misinformation',
                suggestedTask: 'providing assistance',
                suggestedContext: 'user needs and objectives',
                suggestedIrrelevant: 'unrelated topics and personal opinions',
                suggestedSteps: 'understanding, analysis, response'
            }
        };

        return contexts[category] || contexts.general;
    }

    /**
     * Apply rule to generate content
     */
    applyRule(ruleKey, parameters) {
        const rule = this.rules[ruleKey];
        if (!rule) return '';

        let content = rule.template;
        
        // Replace parameters
        Object.keys(parameters).forEach(key => {
            const placeholder = `{${key}}`;
            content = content.replace(placeholder, parameters[key] || '');
        });

        // Add rule prefix
        const prefixes = {
            systemFrame: 'System: ',
            generatorFunction: 'Process: ',
            metaphor: 'Metaphor: ',
            constraints: 'Constraint: ',
            chainOfThought: 'Reasoning: ',
            leverage: 'Analysis: ',
            focus: 'Focus: ',
            role: 'Role: ',
            success: 'Success: ',
            context: 'Context: '
        };

        return (prefixes[ruleKey] || '') + content;
    }

    /**
     * Generate block content
     */
    async generateBlockContent(blockType, context, options = {}) {
        const ruleMapping = {
            who: ['systemFrame', 'role'],
            what: ['generatorFunction', 'success'],
            dont: ['constraints'],
            how: ['focus', 'leverage'],
            think: ['chainOfThought'],
            show: ['metaphor'],
            use: ['context']
        };

        const applicableRules = ruleMapping[blockType] || ['systemFrame'];
        const selectedRule = applicableRules[Math.floor(Math.random() * applicableRules.length)];
        
        const parameters = this.getBlockParameters(blockType, context);
        return this.applyRule(selectedRule, parameters);
    }

    /**
     * Get parameters for block type
     */
    getBlockParameters(blockType, context) {
        const baseParams = {
            task: context,
            output: 'useful response',
            method: 'systematic approach'
        };

        const blockParams = {
            who: {
                role: 'expert assistant',
                input: context,
                method: 'systematic analysis',
                output: 'helpful guidance'
            },
            what: {
                output: 'specific action',
                framework: 'structured approach',
                constraint: 'clarity and accuracy'
            },
            dont: {
                forbidden: 'harmful or inappropriate content',
                task: 'providing assistance'
            },
            how: {
                context: 'user request',
                irrelevant: 'unrelated information'
            },
            think: {
                steps: 'logical reasoning process'
            },
            show: {
                metaphor: 'clear teacher',
                task: 'explaining concepts'
            },
            use: {
                facts: 'provided information',
                task: 'processing user input'
            }
        };

        return { ...baseParams, ...(blockParams[blockType] || {}) };
    }

    /**
     * Validate prompt quality
     */
    async validatePrompt(blocks) {
        let score = 0;
        const feedback = [];

        // Rule compliance scoring
        const hasSystem = blocks.some(b => b.content.includes('System:') || b.content.includes('You are'));
        if (hasSystem) { score += 20; feedback.push('✅ System framing'); }
        else { feedback.push('⚠️ Missing system definition'); }

        const hasProcess = blocks.some(b => b.content.includes('Process:') || b.content.includes('using'));
        if (hasProcess) { score += 15; feedback.push('✅ Process specification'); }
        else { feedback.push('⚠️ Missing process definition'); }

        const hasConstraints = blocks.some(b => b.content.includes('Constraint:') || b.content.includes('Avoid'));
        if (hasConstraints) { score += 15; feedback.push('✅ Constraints defined'); }
        else { feedback.push('⚠️ Missing constraints'); }

        const hasRole = blocks.some(b => b.content.includes('Role:') || b.content.includes('You are'));
        if (hasRole) { score += 15; feedback.push('✅ Role defined'); }
        else { feedback.push('⚠️ Missing role specification'); }

        // Content quality
        const customContent = blocks.filter(b => !b.content.includes('[') && b.content.length > 30);
        score += Math.min(35, customContent.length * 7);

        return {
            score: Math.min(100, score),
            feedback,
            ruleCompliance: this.analyzeRuleCompliance(blocks)
        };
    }

    /**
     * Analyze rule compliance
     */
    analyzeRuleCompliance(blocks) {
        const compliance = {};
        Object.keys(this.rules).forEach(ruleKey => {
            const rule = this.rules[ruleKey];
            compliance[ruleKey] = blocks.some(b => 
                b.content.includes(rule.name) || 
                b.content.includes(rule.description)
            );
        });
        return compliance;
    }
}

// Export for PET
window.PETAIEngine = PETAIEngine; 