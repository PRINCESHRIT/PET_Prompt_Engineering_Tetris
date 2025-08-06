// This file contains functions to update the UI components of the PET application.

export function updatePrompt(prompt) {
    document.getElementById('prompt').value = prompt;
}

export function updateSuggestions(suggestions) {
    const suggestionsDiv = document.getElementById('suggestions');
    suggestionsDiv.innerHTML = '';
    if (!suggestions) return;

    for (const key in suggestions) {
        const block = document.createElement('div');
        block.className = 'suggestion-block';
        const title = document.createElement('h3');
        title.textContent = key;
        block.appendChild(title);
        const list = document.createElement('ul');
        suggestions[key].forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = item;
            list.appendChild(listItem);
        });
        block.appendChild(list);
        suggestionsDiv.appendChild(block);
    }
}

export function updateRules(category, rules) {
    const rulesDiv = document.getElementById('rules');
    rulesDiv.innerHTML = '';
    if (!category || !rules) return;

    const title = document.createElement('h2');
    title.textContent = `Rules for ${category}`;
    rulesDiv.appendChild(title);

    const list = document.createElement('ul');
    rules.forEach(rule => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${rule.name}:</strong> ${rule.description}`;
        list.appendChild(listItem);
    });
    rulesDiv.appendChild(list);
}

export function updateEnhancedContext(context) {
    const contextDiv = document.getElementById('enhanced-context');
    contextDiv.innerHTML = '';
    if (!context) return;

    for (const key in context) {
        const p = document.createElement('p');
        // Make the category clickable
        if (key === 'category') {
            p.innerHTML = `<strong>Category:</strong> <a href="#" class="category-link">${context[key]}</a>`;
        } else {
            p.innerHTML = `<strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong> ${context[key]}`;
        }
        contextDiv.appendChild(p);
    }
}

export function updatePromptTokens(tokens) {
    document.getElementById('prompt-tokens').textContent = tokens;
}

export function updateSuggestionTokens(tokens) {
    document.getElementById('suggestion-tokens').textContent = tokens;
}

export function updatePromptTime(time) {
    document.getElementById('prompt-time').textContent = `${(time / 1000).toFixed(2)}s`;
}

export function updateSuggestionTime(time) {
    document.getElementById('suggestion-time').textContent = `${(time / 1000).toFixed(2)}s`;
}

export function updateAIEngine(engineName) {
    document.getElementById('ai-engine-display').textContent = engineName;
}
