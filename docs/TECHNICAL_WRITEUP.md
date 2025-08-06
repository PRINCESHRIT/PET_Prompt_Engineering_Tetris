# PET (Prompt Engineering Tetris) - Technical Writeup

## 1. Introduction & Vision

**Project:** PET (Prompt Engineering Tetris)  
**Version:** 0.1 (Gemma 3N Primary Implementation)

PET is an innovative, client-side web application designed to be a powerful assistant for crafting, refining, and managing advanced prompts for Large Language Models (LLMs). 

Its core vision is to democratize expert-level prompt engineering, making sophisticated techniques accessible to users of all skill levels through an intuitive, game-like interface.

This document serves as a technical proof-of-work, detailing the engineering decisions, architecture, and core innovations that power PET. 

It is intended for any one interested in understanding the technical underpinnings of PET, including developers, AI researchers, and technical project managers.

---

## 2. System Architecture

PET is built on a robust, multi-layered architecture designed for resilience, performance, and intelligence.
 The system operates entirely on the client-side, leveraging a local Ollama instance to run the Gemma 3N model. 
 
 This ensures user privacy and removes reliance on external cloud services.

The architecture is composed of three primary layers that allow for graceful degradation of service:

### 2.1. Layer 1: `PETGemma3NAdvanced` (The Core Engine)
This is the top-tier engine, providing the full suite of PET's advanced capabilities.
- **Responsibilities:**
    - Performing **Semantic Context Analysis** on user input using AI meta-prompts.
    - Implementing **In-Context Learning** by leveraging persistent training data stored in `localStorage`.
    - Intelligently selecting and applying a combination of the **38 Advanced Prompt Engineering Rules**.
    - Communicating directly with the local Gemma 3N model via the Ollama API.
- **Key Innovation:** This layer doesn't just follow rules; it uses the LLM to reason about the user's prompt *before* attempting to generate a suggestion, leading to significantly more relevant and effective outputs.

### 2.2. Layer 2: `PETOllamaIntegration` (The Fallback Engine)
This middle layer ensures functionality even if the advanced analysis process encounters an issue.
- **Responsibilities:**
    - Provides a more direct, but less nuanced, integration with the Ollama model.
    - Uses a simpler, keyword-based logic to select from the 38 advanced rules.
    - Serves as a reliable fallback if the `PETGemma3NAdvanced` engine fails to generate a response or if its semantic analysis returns an error.

### 2.3. Layer 3: Base Rule-Based System (The Safety Net)
This foundational layer guarantees that the user always receives some form of assistance, even if the connection to the Ollama LLM is completely unavailable.
- **Responsibilities:**
    - Operates without any LLM calls.
    - Provides pre-defined, template-based suggestions based on the 38 rules.
    - Ensures the application remains interactive and useful under any circumstance.

---

## 3. Core AI Innovations

### 3.1. Semantic Context Analysis
The cornerstone of PET's intelligence is its ability to understand user intent semantically.

 Instead of relying on simple keyword matching, PET uses a **meta-prompt**. It wraps the user's input inside a specialized prompt that asks the Gemma 3N model to analyze the input and return a structured JSON object containing:
- **Category:** (e.g., creative, technical, business)
- **Complexity:** (e.g., basic, advanced)
- **Domain:** (e.g., writing, coding, research)
- **Intent:** (The user's goal)
- **Constraints & Keywords:** Any specific requirements or key terms.

This AI-driven analysis provides a rich, nuanced understanding of the user's needs, which informs every subsequent step of the suggestion generation process.

### 3.2. In-Context Learning (Few-Shot Prompting)
PET simulates model fine-tuning through a powerful in-context learning mechanism.
1.  **Data Persistence:** Every successful interaction (where a user accepts a suggestion) is saved as a training example in the browser's `localStorage`. This example includes the initial input, the generated suggestion, and the AI's semantic analysis of the context.
2.  **Contextual Retrieval:** When a new request is made, PET searches the stored training data for examples that are semantically similar to the current context. 
Similarity is calculated based on matching categories, domains, complexity, and keyword overlap.
3. **Few-Shot Injection:** The top 1-3 most relevant examples are dynamically injected into the prompt sent to Gemma 3N.

This process provides the LLM with relevant examples "on the fly," dramatically improving the quality and relevance of its suggestions over time as the user interacts with the application. It's a form of continuous, personalized adaptation without the need for expensive model retraining.

### 3.3. The 38 Advanced Prompt Engineering Rules
The rule set, centralized in `js/ai/advanced-rules.js`, forms the backbone or THE SECRET SAUCE of PET's prompt construction capabilities.

These are not simple templates but are categorized into 8 strategic groups (e.g., Core Abstraction, Leverage & Power Dynamics, Context & Memory).
The `PETGemma3NAdvanced` engine uses the semantic analysis to intelligently select the most appropriate rules to combine for a given prompt, creating a highly tailored and powerful final compiled prompt that is model agnostic and in such a way that it prevents the release of your personal/sensitive information to the closed source chatbots.

---

## 4. Technology Stack

-   **Frontend:** Vanilla JavaScript (ES6 Modules), HTML5, CSS3
-   **AI/LLM Backend:** Ollama running Google's Gemma 3N 4B model locally.
-   **Unit Testing:** Jest
-   **End-to-End Testing:** Playwright
-   **Development Server:** `python -m http.server` or `npx serve`

---

## 5. Testing Strategy

A project of this complexity requires a rigorous testing strategy to ensure reliability.
-   **Unit Tests (`__tests__/*.test.js`):** We use Jest to test individual functions and modules in isolation. This includes mocking the `fetch` API and `localStorage` to test the AI integration and in-context learning logic without requiring a live Ollama server. We have achieved 100% passing status on 13 unit tests covering core AI logic and UI interactions.
-   **End-to-End Tests (`tests/e2e.spec.js`):** We use Playwright to simulate full user journeys, from typing a prompt and receiving a suggestion to managing blocks on the screen. These tests run against a live instance of the application and a running Ollama server, validating the entire system from front to back.

This dual approach ensures that individual components work as expected and that they integrate correctly to deliver a seamless user experience.

## 6. Conclusion

In conclusion, the PET represents a significant advancement in the field of AI-driven contextual prompt engineering.

- Uses smart analysis and learning techniques to completely rethink prompt engineering.
- Transforms a complex process into an asthetically elegant yet simple experience.
- Combines powerful technology with creative human input.
- Seamlessly removes barriers between the user and creative ideas.
- Makes advanced AI capabilities accessible to everyone regardless of their age or experience.
- Focuses on a user experience where technology stays in the background.

For future update we plan to:
- Bring in multimodal capabilities, allowing users to interact with images and text simultaneously (e.g., generating prompts based on images/audio). 
- Make UI enhancements to gamify and improve the entire user experience.
