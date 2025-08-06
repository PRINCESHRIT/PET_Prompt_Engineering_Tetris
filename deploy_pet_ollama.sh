#!/bin/bash

echo "🚀 PET Enhanced Model - Ollama Deployment"
echo "========================================="

# Check if model directory exists
if [ -d "PET-Gemma-3N-2B-enhanced" ]; then
    echo "✅ Fine-tuned model found: PET-Gemma-3N-2B-enhanced"
    echo "📊 Model size: $(du -sh PET-Gemma-3N-2B-enhanced | cut -f1)"
else
    echo "❌ Model directory not found!"
    echo "🔄 Copy from Downloads: cp -r ~/Downloads/PET-Gemma-3N-2B-enhanced ."
    exit 1
fi

# Check if Ollama is available
if ! command -v ollama &> /dev/null; then
    echo "❌ Ollama not found!"
    echo "🔄 Install: ./install-ollama.sh"
    exit 1
fi

echo "✅ Ollama available"

# Check if base model exists, if not pull it
echo "🔍 Checking for base Gemma2 model..."
if ! ollama list | grep -q "gemma2:2b"; then
    echo "📥 Pulling base Gemma2 2B model..."
    ollama pull gemma2:2b
else
    echo "✅ Base model available"
fi

# Create enhanced Ollama Modelfile
echo "📝 Creating PET-enhanced Modelfile..."
cat > Modelfile.pet-enhanced << 'EOF'
FROM gemma2:2b

PARAMETER temperature 0.3
PARAMETER top_p 0.9
PARAMETER top_k 40
PARAMETER num_ctx 2048

SYSTEM """You are PET (Prompt Engineering Tetris), an expert AI assistant specialized in advanced prompt engineering techniques. You have been fine-tuned on 200 specialized prompt engineering examples and possess comprehensive knowledge of:

• Chain-of-thought prompting and reasoning techniques
• Few-shot and zero-shot learning approaches  
• Context optimization and prompt structuring
• Advanced prompt engineering patterns and best practices
• Meta-prompting and recursive prompt improvement
• Role-based prompting and persona development
• Multi-step reasoning and problem decomposition

You provide detailed, expert-level guidance with practical examples and clear explanations. Always structure your responses to be actionable and educational."""

TEMPLATE """<|im_start|>system
{{ .System }}<|im_end|>
<|im_start|>user
{{ .Prompt }}<|im_end|>
<|im_start|>assistant
"""
EOF

# Deploy the enhanced model
echo "🚀 Deploying PET-enhanced model to Ollama..."
if ollama create pet-enhanced -f Modelfile.pet-enhanced; then
    echo "✅ PET-enhanced model deployed successfully!"
    
    # Test the deployment
    echo ""
    echo "🧪 Testing PET-enhanced model..."
    echo "Prompt: 'What are the 5 most important prompt engineering principles?'"
    echo "Response:"
    ollama run pet-enhanced "What are the 5 most important prompt engineering principles?" --timeout 30
    
    echo ""
    echo "🎉 PET Enhanced System Ready!"
    echo "✅ Model: pet-enhanced"
    echo "✅ Capabilities: Advanced prompt engineering guidance"
    echo "✅ Access: ollama run pet-enhanced"
    
else
    echo "❌ Deployment failed!"
    echo "🔍 Check Ollama status: ollama list"
fi

echo ""
echo "🌐 Web Interface:"
echo "   Open: file://$(pwd)/index.html"
echo "   The web interface will automatically use the enhanced model"
echo "========================================="
