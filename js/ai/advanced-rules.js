/**
 * PET Advanced Rules
 * Comprehensive set of 38 advanced prompt engineering rules
 * Shared across all AI integration classes
 */

export const ADVANCED_RULES = {
    // 1. Core Abstraction & Compression
    systemFraming: {
        id: "PET-001",
        name: "System Framing",
        description: "Frame the problem as a system with inputs, processes, and outputs",
        template: "Define this as a system with inputs: {inputs}, processes: {processes}, outputs: {outputs}",
        category: "Core Abstraction"
    },
    generatorFunction: {
        id: "PET-002",
        name: "Generator Function Specification",
        description: "Specify the underlying process to create outcomes",
        template: "Generate {outcome} using {framework} where {constraint} is the key factor",
        category: "Core Abstraction"
    },
    metaphorAbstraction: {
        id: "PET-003",
        name: "Metaphor as Abstraction Layer",
        description: "Map complex problems to simple metaphors",
        template: "Act as {metaphor} to approach this problem: {context}",
        category: "Core Abstraction"
    },
    constraintBased: {
        id: "PET-004",
        name: "Constraint-Based Generation",
        description: "Define what the output cannot be",
        template: "Generate {output} while avoiding: {constraints}",
        category: "Core Abstraction"
    },
    metaChainOfThought: {
        id: "PET-005",
        name: "Meta-Level Chain of Thought",
        description: "Reason through reasoning process",
        template: "Explain your reasoning steps and why you chose this approach over alternatives",
        category: "Core Abstraction"
    },

    // 2. Leverage & Power Dynamics
    leverageWords: {
        id: "PET-006",
        name: "Leverage Words",
        description: "Use terms that force specific operation modes",
        template: "Use {leverage_word} when {action} to ensure {outcome}",
        category: "Leverage & Power"
    },
    informationFlow: {
        id: "PET-007",
        name: "Information Flow Control",
        description: "Explicitly control what to consider and ignore",
        template: "Focus only on {focus_areas}; disregard {ignore_areas}",
        category: "Leverage & Power"
    },
    roleImprinting: {
        id: "PET-008",
        name: "Role-Based Imprinting",
        description: "Assign specific, powerful personas",
        template: "You are {role} with {background} who {capabilities}",
        category: "Leverage & Power"
    },
    successMetric: {
        id: "PET-009",
        name: "Success Metric Definition",
        description: "Define how responses will be judged",
        template: "The best answer is one that is {criteria} and contains {requirements}",
        category: "Leverage & Power"
    },
    contextualDatabase: {
        id: "PET-010",
        name: "Contextual Database Pre-loading",
        description: "Provide curated facts before main query",
        template: "Given these facts: {facts}, now {main_query}",
        category: "Leverage & Power"
    },

    // 3. Temporal & Evolutionary Thinking
    futureStates: {
        id: "PET-011",
        name: "Future States Projection",
        description: "Project trends and future possibilities",
        template: "Given {current_state}, what are {number} plausible scenarios for {timeframe}?",
        category: "Temporal & Evolutionary"
    },
    recursiveCorrection: {
        id: "PET-012",
        name: "Recursive Self-Correction",
        description: "Critique and improve previous outputs",
        template: "Review your response. Identify {number} weaknesses and generate an improved version",
        category: "Temporal & Evolutionary"
    },
    simulationFraming: {
        id: "PET-013",
        name: "Simulation Framing",
        description: "Treat as simulator for complex systems",
        template: "Simulate {system} where {change} occurs. Describe the {timeframe} of change",
        category: "Temporal & Evolutionary"
    },
    counterfactualAnalysis: {
        id: "PET-014",
        name: "Counterfactual Analysis",
        description: "Explore 'what if' scenarios",
        template: "What would be the outcome if {scenario} had been different?",
        category: "Temporal & Evolutionary"
    },
    phaseChange: {
        id: "PET-015",
        name: "Phase Change Identification",
        description: "Identify tipping points and transformations",
        template: "Identify the conditions under which {system} would undergo fundamental transformation",
        category: "Temporal & Evolutionary"
    },

    // 4. Meta-Reasoning & Symmetries
    crossDomainSymmetry: {
        id: "PET-016",
        name: "Cross-Domain Symmetry",
        description: "Map patterns across domains",
        template: "Explain how {concept1} from {domain1} applies to {concept2} in {domain2}",
        category: "Meta-Reasoning"
    },
    narrativeDeconstruction: {
        id: "PET-017",
        name: "Narrative Arc Deconstruction",
        description: "Break down into core components",
        template: "Deconstruct this into: protagonist ({protagonist}), antagonist ({antagonist}), conflict ({conflict}), resolution ({resolution})",
        category: "Meta-Reasoning"
    },
    underlyingAlgorithm: {
        id: "PET-018",
        name: "Underlying Algorithm Discovery",
        description: "Propose generative algorithms",
        template: "What is the computational logic behind {phenomenon}?",
        category: "Meta-Reasoning"
    },
    minimumViableModel: {
        id: "PET-019",
        name: "Minimum Viable Model",
        description: "Simplify to essential form",
        template: "Explain {complex_concept} using only {constraints} to force high-level compression",
        category: "Meta-Reasoning"
    },
    selfReferentialLoops: {
        id: "PET-020",
        name: "Self-Referential Loop Analysis",
        description: "Identify feedback loops",
        template: "Describe the feedback loop between {element1} and {element2} in {system}",
        category: "Meta-Reasoning"
    },

    // 5. Tactical Precision & Asymmetric Advantage
    negativeConstraints: {
        id: "PET-021",
        name: "Negative Constraint Refinement",
        description: "Use negative constraints to refine output",
        template: "Generate {output} that avoids: {negative_constraints}",
        category: "Tactical Precision"
    },
    multiVariatePrompting: {
        id: "PET-022",
        name: "Multi-Variate Prompting",
        description: "Combine multiple non-obvious constraints",
        template: "Generate {output} that is both {constraint1} and {constraint2}, while avoiding {avoidance}",
        category: "Tactical Precision"
    },
    uncertaintyAcknowledgment: {
        id: "PET-023",
        name: "Uncertainty Acknowledgment",
        description: "Force acknowledgment of uncertainty",
        template: "What is the most likely outcome, and what is the probability of {failure_scenario}?",
        category: "Tactical Precision"
    },
    surgicalFormat: {
        id: "PET-024",
        name: "Surgical Format Precision",
        description: "Pre-define output format with precision",
        template: "Create {format} with columns: {columns}. Ensure {requirements}",
        category: "Tactical Precision"
    },
    antiPattern: {
        id: "PET-025",
        name: "Anti-Pattern Rule",
        description: "Actively avoid specific styles or mistakes",
        template: "Do not use {anti_patterns}. Instead, use {preferred_style}",
        category: "Tactical Precision"
    },

    // 6. Operationalizing the Process
    chainOfCommand: {
        id: "PET-026",
        name: "Chain of Command",
        description: "Break into sequential steps",
        template: "Step 1: {step1}. Step 2: {step2}. Step 3: {step3}",
        category: "Operationalizing"
    },
    preMortem: {
        id: "PET-027",
        name: "Pre-Mortem Analysis",
        description: "Assume failure and work backward",
        template: "Assume {project} fails. What were the {number} most likely reasons for failure?",
        category: "Operationalizing"
    },
    devilsAdvocate: {
        id: "PET-028",
        name: "Devil's Advocate Role",
        description: "Argue against own conclusion",
        template: "Provide {number} strong arguments against the solution you just proposed",
        category: "Operationalizing"
    },
    dynamicParameterization: {
        id: "PET-029",
        name: "Dynamic Parameterization",
        description: "Create function-like prompts",
        template: "Given {items}, categorize them into {categories} based on {principle}",
        category: "Operationalizing"
    },
    redTeamAnalysis: {
        id: "PET-030",
        name: "Red Team Analysis",
        description: "Think like an adversary",
        template: "If you were a competitor, what would be the most effective way to disrupt {target}?",
        category: "Operationalizing"
    },

    // 7. Meta-Cognition & Calibration
    confidenceJustification: {
        id: "PET-031",
        name: "Confidence Justification",
        description: "Justify own confidence level",
        template: "On a scale of 1-10, how confident are you in this answer, and why?",
        category: "Meta-Cognition"
    },
    toneCalibration: {
        id: "PET-032",
        name: "Tone and Voice Calibration",
        description: "Define specific tone and voice",
        template: "Respond in the style of {style} with {characteristics}",
        category: "Meta-Cognition"
    },
    unknownUnknowns: {
        id: "PET-033",
        name: "Unknown Unknowns",
        description: "Identify missing information",
        template: "What crucial data is absent that, if included, would change the conclusion?",
        category: "Meta-Cognition"
    },
    fiveWhys: {
        id: "PET-034",
        name: "Five Whys Technique",
        description: "Ask why recursively",
        template: "For this answer, ask 'Why?' five times to reach the root cause",
        category: "Meta-Cognition"
    },
    linguisticScaffolding: {
        id: "PET-035",
        name: "Linguistic Scaffolding",
        description: "Use sentence structures to guide responses",
        template: "The core tension lies between {element1} and {element2}. Explain the dynamics of this tension",
        category: "Meta-Cognition"
    },

    // 8. Advanced Recursive Techniques
    promptGeneration: {
        id: "PET-036",
        name: "Prompt Generation",
        description: "Generate the next prompt",
        template: "Based on your output, generate the most effective follow-up prompt to continue this inquiry",
        category: "Advanced Recursive"
    },
    treeOfThoughts: {
        id: "PET-037",
        name: "Tree of Thoughts",
        description: "Generate multiple solution paths",
        template: "Generate {number} distinct strategies. Evaluate each on {metric}. Expand on the highest-rated strategy",
        category: "Advanced Recursive"
    },
    reflectivePrompting: {
        id: "PET-038",
        name: "Reflective Prompting",
        description: "Re-contextualize with new information",
        template: "Given new information: {new_info}, re-evaluate your previous conclusion and explain the change",
        category: "Advanced Recursive"
    }
};

// Helper function to get rules by category
export function getRulesByCategory(category) {
    return Object.values(ADVANCED_RULES).filter(rule => rule.category === category);
}

// Helper function to get all rule categories
export function getAllCategories() {
    return [...new Set(Object.values(ADVANCED_RULES).map(rule => rule.category))];
}

// Helper function to get a rule by ID
export function getRuleById(id) {
    return Object.values(ADVANCED_RULES).find(rule => rule.id === id);
}
