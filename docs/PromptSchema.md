# Prompt Schema: PET Block Architecture

> **Structure and logic for how prompts are architected within PET**

## 📋 Overview

The PET Prompt Schema is a standardized JSON format that represents a complete prompt as a collection of modular, ordered "blocks." This structure allows prompts to be treated as data—enabling them to be saved, loaded, manipulated, and processed by the AI engine.

## 🎯 Core Principles

### **Modularity**
A prompt is not a single string of text but a composite of distinct, logical components (blocks). This makes prompts easier to build and reason about.

### **Machine-Readability**
The schema is structured as JSON to be easily parsed and handled by the application's JavaScript logic and any future tooling.

### **Extensibility**
The schema is designed with future needs in mind, allowing for new block types and metadata without breaking backward compatibility.

### **Statefulness**
The schema explicitly stores the state of each block (e.g., whether it is active or inactive), allowing the user's workspace to be perfectly preserved.

## 🎮 Schema Definition

A PET prompt is represented as a JSON object containing a single key, `pet_prompt`, which holds an array of "Block Objects."

```json
{
  "pet_prompt": [
    {
      "id": "uuid-1",
      "type": "objective_persona",
      "content": "You are a senior strategy consultant for AI systems.",
      "active": true,
      "position": {"x": 0, "y": 0},
      "tetris_shape": "T",
      "metadata": {
        "creation_method": "voice_command",
        "ai_suggested": false,
        "validation_score": 85,
        "created": "2024-01-15T10:30:00Z",
        "modified": "2024-01-15T11:45:00Z"
      }
    },
    {
      "id": "uuid-2",
      "type": "constraints_block",
      "content": "Speak clearly and use no poetic language. Your response must be in Markdown format.",
      "active": true,
      "position": {"x": 1, "y": 0},
      "tetris_shape": "L",
      "metadata": {
        "creation_method": "tetris_drop",
        "ai_suggested": true,
        "validation_score": 92,
        "created": "2024-01-15T10:35:00Z",
        "modified": "2024-01-15T11:45:00Z"
      }
    }
  ],
  "metadata": {
    "version": "1.0",
    "created": "2024-01-15T10:30:00Z",
    "last_modified": "2024-01-15T11:45:00Z",
    "total_blocks": 6,
    "active_blocks": 5,
    "validation_score": 87,
    "compilation_count": 12,
    "user_patterns": {
      "preferred_blocks": ["objective_persona", "instructions_block"],
      "common_combinations": [["objective_persona", "instructions_block"]],
      "improvement_trajectory": [75, 80, 87]
    }
  }
}
```

## 🧱 Block Object Specification

Each object within the `pet_prompt` array is a "Block" and has the following key-value pairs:

| Key | Type | Description | Required |
|-----|------|-------------|----------|
| `id` | String | A unique identifier for the block, typically a UUID. This is crucial for managing the block in the UI. | Yes |
| `type` | String | Defines the semantic purpose of the block. Standard types include: `objective_persona`, `instructions_block`, `constraints_block`, `chain_of_thought`, `output_format`, `examples_block`, `text_literal`. | Yes |
| `content` | String | The raw text content of the block. | Yes |
| `active` | Boolean | Determines if the block's `content` is included in the final compiled prompt. `true` for active, `false` for inactive. | Yes |
| `position` | Object | The x,y coordinates of the block on the Tetris workspace canvas. | Yes |
| `tetris_shape` | String | The Tetris piece shape associated with this block type (T, I, L, O, S, Z, J). | Yes |
| `metadata` | Object | An object reserved for future use, such as versioning notes, AI-generated suggestions, or performance metrics. | No |

## 🎮 Block Types & Tetris Mapping

### **T-Block (T-piece): Objective/Persona**
```json
{
  "type": "objective_persona",
  "tetris_shape": "T",
  "description": "Define the role and persona for the AI",
  "template": "You are a {role} with expertise in {domain}.",
  "validation_weight": 0.25
}
```

**Purpose**: Establishes the AI's role, expertise, and perspective for the interaction.

**Examples**:
- "You are a senior financial analyst with expertise in market trends and risk assessment."
- "You are a compassionate therapist specializing in cognitive behavioral therapy."
- "You are a master chef with 20 years of experience in French cuisine."

### **I-Block (I-piece): Instructions**
```json
{
  "type": "instructions_block",
  "tetris_shape": "I",
  "description": "Clear task instructions with specific verbs",
  "template": "Please {action} the {subject} by {method}.",
  "validation_weight": 0.20
}
```

**Purpose**: Provides clear, actionable instructions for what the AI should do.

**Examples**:
- "Analyze the quarterly earnings report and identify the top 3 key performance indicators."
- "Write a compelling blog post that explains the benefits while addressing common concerns."
- "Create a step-by-step guide for beginners to set up a development environment."

### **L-Block (L-piece): Constraints**
```json
{
  "type": "constraints_block",
  "tetris_shape": "L",
  "description": "Limitations and boundaries for the response",
  "template": "Limit your response to {constraint}.",
  "validation_weight": 0.15
}
```

**Purpose**: Defines what the AI should NOT do and sets clear boundaries.

**Examples**:
- "Limit your response to maximum 3 bullet points and 200 words total."
- "Avoid technical jargon and explain concepts in simple terms."
- "Do not include personal opinions or subjective judgments."

### **O-Block (O-piece): Output Format**
```json
{
  "type": "output_format",
  "tetris_shape": "O",
  "description": "Specify the structure and format of the response",
  "template": "Format your response as: {format}",
  "validation_weight": 0.10
}
```

**Purpose**: Defines how the AI should structure and present its response.

**Examples**:
- "Format your response as a structured table with columns: Metric, Current Value, Target, Action Required."
- "Structure your response as an executive summary followed by detailed analysis and actionable recommendations."
- "Provide your response in JSON format with keys: summary, key_points, and recommendations."

### **S-Block (S-piece): Chain of Thought**
```json
{
  "type": "chain_of_thought",
  "tetris_shape": "S",
  "description": "Step-by-step reasoning process",
  "template": "Think through this step by step: {reasoning}",
  "validation_weight": 0.15
}
```

**Purpose**: Instructs the AI to show its reasoning process and logical steps.

**Examples**:
- "Think through this step by step: First, analyze the data patterns, then identify correlations, finally draw conclusions."
- "Break down the problem: 1) Identify the root cause, 2) Evaluate potential solutions, 3) Recommend the best approach."
- "Show your reasoning: Start with the most important factors, then consider secondary influences, and finally synthesize your findings."

### **Z-Block (Z-piece): Examples**
```json
{
  "type": "examples_block",
  "tetris_shape": "Z",
  "description": "Provide examples and use cases",
  "template": "Examples: {examples}",
  "validation_weight": 0.10
}
```

**Purpose**: Provides concrete examples to guide the AI's understanding and output.

**Examples**:
- "Examples: For customer feedback analysis, look for patterns in sentiment scores, response times, and resolution rates."
- "Use cases: Email marketing campaigns, social media content, product descriptions, and customer support responses."
- "Sample outputs: A concise summary, a detailed analysis, and a set of actionable recommendations."

### **J-Block (J-piece): Text Literal**
```json
{
  "type": "text_literal",
  "tetris_shape": "J",
  "description": "Raw text content to be processed",
  "template": "Process this text: {content}",
  "validation_weight": 0.05
}
```

**Purpose**: Contains raw text content that the AI should process according to other block instructions.

**Examples**:
- "Process this quarterly earnings report: [attached document text]"
- "Analyze this customer feedback: [feedback text]"
- "Review this code: [code snippet]"

## 🔄 Compilation Logic

When the user clicks the "Compile" button, the application will:

1. **Read the `pet_prompt` array**
2. **Filter the array** to include only blocks where `active` is `true`
3. **Sort blocks** by their logical order (objective → instructions → constraints → format → reasoning → examples → content)
4. **Concatenate the `content`** string of each block, separated by double newlines (`\n\n`)
5. **Display the final, single-string prompt** in the output area

### **Compilation Order**
```javascript
const BLOCK_ORDER = [
  'objective_persona',    // T-block: Foundation
  'instructions_block',   // I-block: Direction
  'constraints_block',    // L-block: Boundaries
  'output_format',        // O-block: Structure
  'chain_of_thought',     // S-block: Reasoning
  'examples_block',       // Z-block: Patterns
  'text_literal'          // J-block: Content
];
```

### **Example Compilation**
```json
// Input blocks
[
  {"type": "objective_persona", "content": "You are a financial analyst.", "active": true},
  {"type": "instructions_block", "content": "Analyze the earnings report.", "active": true},
  {"type": "constraints_block", "content": "Limit to 3 bullet points.", "active": true},
  {"type": "output_format", "content": "Format as a table.", "active": true}
]

// Compiled output
"You are a financial analyst.

Analyze the earnings report.

Limit to 3 bullet points.

Format as a table."
```

## 📊 Validation Integration

### **Block-Level Validation**
Each block can have its own validation score stored in metadata:

```json
{
  "metadata": {
    "validation_score": 85,
    "validation_feedback": "Good objective definition, consider adding specific expertise areas",
    "ai_suggestions": ["Add years of experience", "Specify industry focus"]
  }
}
```

### **Prompt-Level Validation**
The overall prompt receives a composite score based on block weights:

```json
{
  "metadata": {
    "validation_score": 87,
    "score_breakdown": {
      "structural": 25,
      "clarity": 18,
      "context": 12,
      "logic": 16,
      "examples": 8,
      "parameters": 4,
      "safety": 4
    }
  }
}
```

## 🔧 Metadata Schema

### **Block Metadata**
```json
{
  "metadata": {
    "creation_method": "voice_command" | "tetris_drop" | "ai_suggestion" | "manual",
    "ai_suggested": boolean,
    "validation_score": number (0-100),
    "validation_feedback": string,
    "ai_suggestions": string[],
    "created": "ISO-8601-timestamp",
    "modified": "ISO-8601-timestamp",
    "usage_count": number,
    "user_rating": number (1-5)
  }
}
```

### **Prompt Metadata**
```json
{
  "metadata": {
    "version": "1.0",
    "created": "ISO-8601-timestamp",
    "last_modified": "ISO-8601-timestamp",
    "total_blocks": number,
    "active_blocks": number,
    "validation_score": number (0-100),
    "compilation_count": number,
    "user_patterns": {
      "preferred_blocks": string[],
      "common_combinations": string[][],
      "improvement_trajectory": number[]
    },
    "tags": string[],
    "category": string,
    "difficulty": "beginner" | "intermediate" | "advanced"
  }
}
```

## 🎮 Position System

### **Canvas Coordinates**
Blocks are positioned on a 5x3 grid (15 blocks maximum):

```json
{
  "position": {
    "x": 0,  // 0-4 (5 columns)
    "y": 0   // 0-2 (3 rows)
  }
}
```

### **Grid Layout**
```
[0,0] [1,0] [2,0] [3,0] [4,0]
[0,1] [1,1] [2,1] [3,1] [4,1]
[0,2] [1,2] [2,2] [3,2] [4,2]
```

## 🔄 Version Control

### **Block Versioning**
Each block can track its evolution:

```json
{
  "metadata": {
    "version_history": [
      {
        "version": 1,
        "content": "Original content",
        "timestamp": "2024-01-15T10:30:00Z"
      },
      {
        "version": 2,
        "content": "Updated content",
        "timestamp": "2024-01-15T11:45:00Z"
      }
    ]
  }
}
```

### **Prompt Versioning**
The entire prompt can be versioned:

```json
{
  "metadata": {
    "prompt_version": "1.2.3",
    "change_log": [
      "Added constraint block for response length",
      "Updated objective to be more specific",
      "Improved output format specification"
    ]
  }
}
```

## 🎯 Schema Benefits

### **For Users**
- **Visual structure** makes prompts easier to understand
- **Modular editing** allows fine-tuning individual components
- **Version control** tracks prompt evolution
- **Reusable blocks** can be saved as templates

### **For Developers**
- **Machine-readable** format enables automation
- **Extensible design** supports future features
- **Validation integration** provides quality metrics
- **AI processing** can analyze and improve prompts

### **For AI**
- **Structured input** improves understanding
- **Component analysis** enables targeted suggestions
- **Pattern recognition** learns from user behavior
- **Quality assessment** provides feedback loops

---

**The PET Prompt Schema transforms prompt engineering from unstructured text into modular, manageable, and measurable components.** 