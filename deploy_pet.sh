#!/bin/bash

echo "🚀 Deploying PET Enhanced Model to Ollama"
echo "========================================"

# Check if model directory exists
MODEL_DIR=""
if [ -d "PET-Gemma-3N-2B-enhanced" ]; then
    MODEL_DIR="PET-Gemma-3N-2B-enhanced"
    echo "✅ Found model directory: $MODEL_DIR"
elif [ -d "PET-Gemma-3N-2B-enhanced-merged" ]; then
    MODEL_DIR="PET-Gemma-3N-2B-enhanced-merged"
    echo "✅ Found merged model directory: $MODEL_DIR"
else
    echo "❌ Model directory not found!"
    echo "📁 Available directories:"
    ls -la | grep "^d"
    echo ""
    echo "🔄 Please download and extract model from Colab first:"
    echo "   unzip ~/Downloads/PET-Gemma-3N-2B-enhanced.zip"
    exit 1
fi

# Update Modelfile with correct path
echo "📝 Creating Ollama Modelfile..."
cat > Modelfile.pet << EOF
FROM ./$MODEL_DIR

PARAMETER temperature 0.3
PARAMETER top_p 0.9
PARAMETER top_k 40
PARAMETER num_ctx 2048

SYSTEM """You are PET (Prompt Engineering Tetris), an expert AI assistant specialized in prompt engineering. You have been fine-tuned on 200 specialized examples with 38 advanced functional rules. Provide detailed, expert-level guidance on prompt engineering techniques, best practices, and optimization strategies."""

TEMPLATE """<|im_start|>system
{{ .System }}<|im_end|>
<|im_start|>user
{{ .Prompt }}<|im_end|>
<|im_start|>assistant
"""
EOF

# Deploy to Ollama
echo "🔄 Deploying to Ollama..."
if ollama create pet-enhanced -f Modelfile.pet; then
    echo "✅ Model deployed successfully as 'pet-enhanced'"
    
    # Test deployment
    echo "🧪 Testing deployment..."
    echo "Prompt: 'What are 3 key prompt engineering principles?'"
    ollama run pet-enhanced "What are 3 key prompt engineering principles?" --timeout 30
    
    echo "✅ PET Enhanced Model deployed and tested!"
else
    echo "❌ Deployment failed!"
    echo "🔍 Check if Ollama is running: ollama serve"
fi

echo "========================================"
