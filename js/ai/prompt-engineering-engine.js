/**
 * PET Prompt Engineering Engine
 * Automatic text generation based on 35 prompt engineering rules
 */

class PETPromptEngine {
    constructor() {
        this.rules = this.initializeRules();
        this.context = {};
        this.generationHistory = [];
    }

    /**
     * Initialize the 35 prompt engineering rules
     */
    initializeRules() {
        return {
            // Core Abstraction & Compression
            rule1: {
                name: "Frame as System",
                description: "Define inputs, processes, outputs",
                template: "You are a {role} analyzing {input}. Process this through {method} to produce {output}."
            },
            rule2: {
                name: "Generator Function",
                description: "Specify the underlying process",
                template: "Generate {output} using {framework} where {constraint}."
            },
            rule3: {
                name: "Metaphor Abstraction",
                description: "Map to simple metaphor",
                template: "Act as {metaphor} to {task}."
            },
            rule4: {
                name: "Constraint-Based",
                description: "Define what NOT to do",
                template: "Avoid {forbidden} while {task}."
            },
            rule5: {
                name: "Meta Chain of Thought",
                description: "Reason about reasoning",
                template: "Think step-by-step: {steps}. Explain your reasoning process."
            },

            // Leverage & Power Dynamics
            rule6: {
                name: "Leverage Words",
                description: "Use power terms",
                template: "{leverage_word} analyze {subject} with {approach}."
            },
            rule7: {
                name: "Control Information Flow",
                description: "Focus on specific context",
                template: "Focus only on {context}. Ignore {irrelevant}."
            },
            rule8: {
                name: "Role Imprinting",
                description: "Assign specific persona",
                template: "You are {role} with expertise in {domain}."
            },
            rule9: {
                name: "Success Metric",
                description: "Define evaluation criteria",
                template: "The best answer is {criteria}."
            },
            rule10: {
                name: "Pre-load Context",
                description: "Provide curated facts",
                template: "Background: {facts}. Given this, {task}."
            },

            // Temporal & Evolutionary
            rule11: {
                name: "Future States",
                description: "Project trends forward",
                template: "Given {current_data}, what are {scenarios} in {timeframe}?"
            },
            rule12: {
                name: "Self-Correction",
                description: "Critique and improve",
                template: "Review your response. Identify {weaknesses} and improve."
            },
            rule13: {
                name: "Simulation Frame",
                description: "Treat as simulator",
                template: "Simulate {system} over {timeline}: {steps}."
            },
            rule14: {
                name: "Counterfactuals",
                description: "Explore what-if scenarios",
                template: "What if {change}? How would {outcome} differ?"
            },
            rule15: {
                name: "Phase Change",
                description: "Identify tipping points",
                template: "Under what conditions would {system} undergo {transformation}?"
            },

            // Meta-Reasoning & Symmetries
            rule16: {
                name: "Cross-Domain Symmetry",
                description: "Map patterns across domains",
                template: "Explain how {concept1} applies to {domain2}."
            },
            rule17: {
                name: "Narrative Deconstruction",
                description: "Break into components",
                template: "Analyze {story} by identifying {components}."
            },
            rule18: {
                name: "Underlying Algorithm",
                description: "Specify procedural logic",
                template: "What algorithm describes {phenomenon}?"
            },
            rule19: {
                name: "Minimum Viable Model",
                description: "Radical simplification",
                template: "Explain {concept} to a {audience} in {constraint}."
            },
            rule20: {
                name: "Self-Referential Loops",
                description: "Identify feedback mechanisms",
                template: "Describe the feedback loop between {element1} and {element2}."
            },

            // Tactical Precision
            rule21: {
                name: "Negative Constraints",
                description: "Specify what not to do",
                template: "Write {output} without {forbidden_elements}."
            },
            rule22: {
                name: "Multi-Variate Constraints",
                description: "Stack multiple requirements",
                template: "Create {output} that is {constraint1}, {constraint2}, and {constraint3}."
            },
            rule23: {
                name: "Uncertainty Acknowledgment",
                description: "Express confidence levels",
                template: "What is the most likely {outcome} and its probability?"
            },
            rule24: {
                name: "Precise Format",
                description: "Define exact structure",
                template: "Output as {format} with columns: {columns}."
            },
            rule25: {
                name: "Anti-Pattern Rule",
                description: "Forbid clichés",
                template: "Answer {task}. Do not use {clichés}."
            },

            // Operationalizing
            rule26: {
                name: "Chain of Command",
                description: "Sequential steps",
                template: "Step 1: {action1}. Step 2: {action2}. Step 3: {action3}."
            },
            rule27: {
                name: "Pre-Mortem",
                description: "Assume failure",
                template: "Assume {project} fails. What are the top {number} reasons?"
            },
            rule28: {
                name: "Devil's Advocate",
                description: "Argue against proposal",
                template: "Provide {number} strong counter-arguments to {proposal}."
            },
            rule29: {
                name: "Dynamic Parameterization",
                description: "Template with variables",
                template: "Given {list}, categorize into {categories} based on {principle}."
            },
            rule30: {
                name: "Red Team Analysis",
                description: "Think like adversary",
                template: "If you were a {adversary}, how would you {attack}?"
            },

            // Meta-Cognition
            rule31: {
                name: "Confidence Justification",
                description: "Rate certainty",
                template: "On a scale of 1-10, how confident are you? Explain why."
            },
            rule32: {
                name: "Tone Calibration",
                description: "Define voice",
                template: "Respond in the voice of {persona}."
            },
            rule33: {
                name: "Unknown Unknowns",
                description: "Identify gaps",
                template: "What crucial information is missing from {analysis}?"
            },
            rule34: {
                name: "Five Whys",
                description: "Recursive questioning",
                template: "Why {statement}? (Repeat 5 times to find root cause)"
            },
            rule35: {
                name: "Linguistic Scaffolding",
                description: "Structure language",
                template: "The core tension is between {X} and {Y}. Explain their interaction."
            }
        };
    }

    /**
     * Generate contextual suggestions based on heart prompt
     */
    async generateSuggestions(heartPrompt, existingBlocks = []) {
        const context = this.analyzeContext(heartPrompt);
        const suggestions = [];

        // Rule 1: Frame as System
        if (!existingBlocks.some(b => b.type === 'who')) {
            suggestions.push({
                type: 'who',
                rule: 'rule1',
                content: this.applyRule('rule1', {
                    role: context.suggestedRole,
                    input: heartPrompt,
                    method: context.suggestedMethod,
                    output: context.suggestedOutput
                })
            });
        }

        // Rule 2: Generator Function
        if (!existingBlocks.some(b => b.type === 'what')) {
            suggestions.push({
                type: 'what',
                rule: 'rule2',
                content: this.applyRule('rule2', {
                    output: context.suggestedOutput,
                    framework: context.suggestedFramework,
                    constraint: context.suggestedConstraint
                })
            });
        }

        // Rule 4: Constraint-Based
        if (!existingBlocks.some(b => b.type === 'dont')) {
            suggestions.push({
                type: 'dont',
                rule: 'rule4',
                content: this.applyRule('rule4', {
                    forbidden: context.suggestedForbidden,
                    task: context.suggestedTask
                })
            });
        }

        // Rule 8: Role Imprinting
        if (!existingBlocks.some(b => b.type === 'how')) {
            suggestions.push({
                type: 'how',
                rule: 'rule8',
                content: this.applyRule('rule8', {
                    role: context.suggestedRole,
                    domain: context.suggestedDomain
                })
            });
        }

        // Rule 5: Meta Chain of Thought
        if (!existingBlocks.some(b => b.type === 'think')) {
            suggestions.push({
                type: 'think',
                rule: 'rule5',
                content: this.applyRule('rule5', {
                    steps: context.suggestedSteps
                })
            });
        }

        // Rule 19: Minimum Viable Model
        if (!existingBlocks.some(b => b.type === 'show')) {
            suggestions.push({
                type: 'show',
                rule: 'rule19',
                content: this.applyRule('rule19', {
                    concept: context.suggestedConcept,
                    audience: context.suggestedAudience,
                    constraint: context.suggestedConstraint
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
        
        // Determine context category
        let category = 'general';
        if (promptLower.includes('story') || promptLower.includes('write') || promptLower.includes('creative')) {
            category = 'creative';
        } else if (promptLower.includes('analyze') || promptLower.includes('data') || promptLower.includes('trends')) {
            category = 'analytical';
        } else if (promptLower.includes('explain') || promptLower.includes('teach') || promptLower.includes('learn')) {
            category = 'educational';
        } else if (promptLower.includes('code') || promptLower.includes('debug') || promptLower.includes('program')) {
            category = 'technical';
        } else if (promptLower.includes('plan') || promptLower.includes('organize') || promptLower.includes('strategy')) {
            category = 'planning';
        }

        // Return contextual suggestions
        return this.getContextualSuggestions(category, heartPrompt);
    }

    /**
     * Get contextual suggestions based on category
     */
    getContextualSuggestions(category, heartPrompt) {
        const contexts = {
            creative: {
                suggestedRole: 'creative storyteller',
                suggestedMethod: 'narrative framework',
                suggestedOutput: 'engaging story',
                suggestedFramework: 'Hero\'s Journey',
                suggestedConstraint: 'emotional resonance',
                suggestedForbidden: 'clichés and predictable endings',
                suggestedTask: 'crafting compelling narratives',
                suggestedDomain: 'creative writing',
                suggestedSteps: 'character development, plot progression, emotional climax',
                suggestedConcept: 'storytelling principles',
                suggestedAudience: 'general reader',
                suggestedConstraint: 'three sentences'
            },
            analytical: {
                suggestedRole: 'data analyst',
                suggestedMethod: 'systematic analysis',
                suggestedOutput: 'insightful analysis',
                suggestedFramework: 'data-driven approach',
                suggestedConstraint: 'evidence-based conclusions',
                suggestedForbidden: 'speculation without data',
                suggestedTask: 'analyzing patterns and trends',
                suggestedDomain: 'data science',
                suggestedSteps: 'data collection, pattern identification, conclusion drawing',
                suggestedConcept: 'analytical thinking',
                suggestedAudience: 'business professional',
                suggestedConstraint: 'executive summary'
            },
            educational: {
                suggestedRole: 'patient teacher',
                suggestedMethod: 'progressive learning',
                suggestedOutput: 'clear explanation',
                suggestedFramework: 'scaffolded learning',
                suggestedConstraint: 'accessibility',
                suggestedForbidden: 'jargon and assumptions',
                suggestedTask: 'explaining complex concepts',
                suggestedDomain: 'education',
                suggestedSteps: 'foundation building, concept introduction, practical application',
                suggestedConcept: 'learning principles',
                suggestedAudience: 'student',
                suggestedConstraint: 'simple language'
            },
            technical: {
                suggestedRole: 'software engineer',
                suggestedMethod: 'systematic debugging',
                suggestedOutput: 'working solution',
                suggestedFramework: 'problem-solving methodology',
                suggestedConstraint: 'best practices',
                suggestedForbidden: 'unsafe code and deprecated methods',
                suggestedTask: 'solving technical problems',
                suggestedDomain: 'software development',
                suggestedSteps: 'problem identification, solution design, implementation',
                suggestedConcept: 'programming logic',
                suggestedAudience: 'developer',
                suggestedConstraint: 'commented code'
            },
            planning: {
                suggestedRole: 'strategic planner',
                suggestedMethod: 'systematic organization',
                suggestedOutput: 'actionable plan',
                suggestedFramework: 'project management',
                suggestedConstraint: 'feasibility',
                suggestedForbidden: 'unrealistic timelines and vague objectives',
                suggestedTask: 'creating organized plans',
                suggestedDomain: 'project management',
                suggestedSteps: 'goal setting, resource planning, timeline creation',
                suggestedConcept: 'planning principles',
                suggestedAudience: 'project manager',
                suggestedConstraint: 'actionable steps'
            },
            general: {
                suggestedRole: 'helpful assistant',
                suggestedMethod: 'systematic approach',
                suggestedOutput: 'useful response',
                suggestedFramework: 'problem-solving',
                suggestedConstraint: 'clarity and accuracy',
                suggestedForbidden: 'confusion and misinformation',
                suggestedTask: 'providing assistance',
                suggestedDomain: 'general knowledge',
                suggestedSteps: 'understanding, analysis, response',
                suggestedConcept: 'helpful communication',
                suggestedAudience: 'general user',
                suggestedConstraint: 'clear and concise'
            }
        };

        return contexts[category] || contexts.general;
    }

    /**
     * Apply specific rule to generate content
     */
    applyRule(ruleKey, parameters) {
        const rule = this.rules[ruleKey];
        if (!rule) return '';

        let content = rule.template;
        
        // Replace parameters in template
        Object.keys(parameters).forEach(key => {
            const placeholder = `{${key}}`;
            content = content.replace(placeholder, parameters[key] || '');
        });

        // Add rule-specific enhancements
        content = this.enhanceWithRule(ruleKey, content, parameters);
        
        return content;
    }

    /**
     * Enhance content with rule-specific improvements
     */
    enhanceWithRule(ruleKey, content, parameters) {
        const enhancements = {
            rule1: `System: ${content}`,
            rule2: `Process: ${content}`,
            rule3: `Metaphor: ${content}`,
            rule4: `Constraint: ${content}`,
            rule5: `Reasoning: ${content}`,
            rule6: `Analysis: ${content}`,
            rule7: `Focus: ${content}`,
            rule8: `Role: ${content}`,
            rule9: `Success: ${content}`,
            rule10: `Context: ${content}`,
            rule11: `Future: ${content}`,
            rule12: `Review: ${content}`,
            rule13: `Simulation: ${content}`,
            rule14: `What-if: ${content}`,
            rule15: `Tipping Point: ${content}`,
            rule16: `Analogy: ${content}`,
            rule17: `Structure: ${content}`,
            rule18: `Algorithm: ${content}`,
            rule19: `Simplified: ${content}`,
            rule20: `Feedback: ${content}`,
            rule21: `Avoid: ${content}`,
            rule22: `Multi-Constraint: ${content}`,
            rule23: `Uncertainty: ${content}`,
            rule24: `Format: ${content}`,
            rule25: `Anti-Pattern: ${content}`,
            rule26: `Steps: ${content}`,
            rule27: `Pre-Mortem: ${content}`,
            rule28: `Counter: ${content}`,
            rule29: `Template: ${content}`,
            rule30: `Red Team: ${content}`,
            rule31: `Confidence: ${content}`,
            rule32: `Voice: ${content}`,
            rule33: `Gaps: ${content}`,
            rule34: `Root Cause: ${content}`,
            rule35: `Tension: ${content}`
        };

        return enhancements[ruleKey] || content;
    }

    /**
     * Generate block content using AI rules
     */
    async generateBlockContent(blockType, context, options = {}) {
        const ruleMapping = {
            who: ['rule1', 'rule8', 'rule10'],
            what: ['rule2', 'rule9', 'rule26'],
            dont: ['rule4', 'rule21', 'rule25'],
            how: ['rule7', 'rule24', 'rule32'],
            think: ['rule5', 'rule18', 'rule34'],
            show: ['rule19', 'rule17', 'rule29'],
            use: ['rule10', 'rule13', 'rule20']
        };

        const applicableRules = ruleMapping[blockType] || ['rule1'];
        const selectedRule = applicableRules[Math.floor(Math.random() * applicableRules.length)];
        
        const parameters = this.getBlockParameters(blockType, context);
        const content = this.applyRule(selectedRule, parameters);
        
        // Store generation history
        this.generationHistory.push({
            blockType,
            rule: selectedRule,
            context,
            content,
            timestamp: Date.now()
        });

        return content;
    }

    /**
     * Get parameters for specific block type
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
                domain: 'relevant field',
                ...baseParams
            },
            what: {
                output: 'specific action',
                framework: 'structured approach',
                constraint: 'clarity and accuracy',
                ...baseParams
            },
            dont: {
                forbidden: 'harmful or inappropriate content',
                task: 'providing assistance',
                ...baseParams
            },
            how: {
                context: 'user request',
                irrelevant: 'unrelated information',
                ...baseParams
            },
            think: {
                steps: 'logical reasoning process',
                ...baseParams
            },
            show: {
                concept: 'key principles',
                audience: 'user',
                constraint: 'clear examples',
                ...baseParams
            },
            use: {
                facts: 'provided information',
                task: 'processing user input',
                ...baseParams
            }
        };

        return blockParams[blockType] || baseParams;
    }

    /**
     * Validate prompt using AI rules
     */
    async validatePrompt(blocks) {
        let score = 0;
        const feedback = [];

        // Rule 1: System framing (20 points)
        const hasSystem = blocks.some(b => b.content.includes('System:') || b.content.includes('You are'));
        if (hasSystem) {
            score += 20;
            feedback.push('✅ Proper system framing');
        } else {
            feedback.push('⚠️ Missing system/role definition');
        }

        // Rule 2: Generator function (15 points)
        const hasProcess = blocks.some(b => b.content.includes('Process:') || b.content.includes('using'));
        if (hasProcess) {
            score += 15;
            feedback.push('✅ Process specification present');
        } else {
            feedback.push('⚠️ Missing process definition');
        }

        // Rule 4: Constraints (15 points)
        const hasConstraints = blocks.some(b => b.content.includes('Constraint:') || b.content.includes('Avoid'));
        if (hasConstraints) {
            score += 15;
            feedback.push('✅ Constraints defined');
        } else {
            feedback.push('⚠️ Missing constraints');
        }

        // Rule 8: Role imprinting (15 points)
        const hasRole = blocks.some(b => b.content.includes('Role:') || b.content.includes('You are'));
        if (hasRole) {
            score += 15;
            feedback.push('✅ Role clearly defined');
        } else {
            feedback.push('⚠️ Missing role specification');
        }

        // Rule 9: Success metrics (10 points)
        const hasMetrics = blocks.some(b => b.content.includes('Success:') || b.content.includes('best answer'));
        if (hasMetrics) {
            score += 10;
            feedback.push('✅ Success criteria defined');
        } else {
            feedback.push('⚠️ Missing success metrics');
        }

        // Content quality (25 points)
        const customContent = blocks.filter(b => 
            !b.content.includes('[') && b.content.length > 30
        );
        score += Math.min(25, customContent.length * 5);

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
            const hasRule = blocks.some(b => 
                b.content.includes(rule.name) || 
                b.content.includes(rule.description)
            );
            compliance[ruleKey] = hasRule;
        });

        return compliance;
    }

    /**
     * Get generation statistics
     */
    getStats() {
        const ruleUsage = {};
        this.generationHistory.forEach(entry => {
            ruleUsage[entry.rule] = (ruleUsage[entry.rule] || 0) + 1;
        });

        return {
            totalGenerations: this.generationHistory.length,
            ruleUsage,
            averageQuality: this.calculateAverageQuality()
        };
    }

    /**
     * Calculate average quality score
     */
    calculateAverageQuality() {
        if (this.generationHistory.length === 0) return 0;
        
        const scores = this.generationHistory.map(entry => {
            // Simple quality heuristic based on content length and rule usage
            let score = 50;
            if (entry.content.length > 50) score += 20;
            if (entry.content.length > 100) score += 20;
            if (entry.rule) score += 10;
            return Math.min(100, score);
        });

        return scores.reduce((a, b) => a + b, 0) / scores.length;
    }
}

// Export for use in PET
window.PETPromptEngine = PETPromptEngine; 