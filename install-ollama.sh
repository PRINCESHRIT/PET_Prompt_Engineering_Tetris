#!/bin/bash

# PET Ollama Installation Script
# Installs Ollama and downloads Gemma 3N model for PET

echo "🚀 PET Ollama Installation Script"
echo "=================================="

# Check if Ollama is already installed
if command -v ollama &> /dev/null; then
    echo "✅ Ollama is already installed"
else
    echo "📥 Installing Ollama..."
    curl -fsSL https://ollama.com/install.sh | sh
    
    if [ $? -eq 0 ]; then
        echo "✅ Ollama installed successfully"
    else
        echo "❌ Ollama installation failed"
        exit 1
    fi
fi

# Start Ollama service
echo "🔧 Starting Ollama service..."
ollama serve &
OLLAMA_PID=$!

# Wait for Ollama to start
echo "⏳ Waiting for Ollama to start..."
sleep 5

# Check if Ollama is running
if curl -s http://localhost:11434/api/tags > /dev/null; then
    echo "✅ Ollama service is running"
else
    echo "❌ Ollama service failed to start"
    exit 1
fi

# Download Gemma 3N model
echo "📥 Downloading Gemma 3N model (this may take 5-10 minutes)..."
ollama pull hf.co/unsloth/gemma-3n-E4B-it-GGUF:UD-Q4_K_XL

if [ $? -eq 0 ]; then
    echo "✅ Gemma 3N model downloaded successfully"
else
    echo "❌ Model download failed"
    exit 1
fi

# Test the model
echo "🧪 Testing the model..."
TEST_RESPONSE=$(curl -s http://localhost:11434/api/generate \
  -d '{"model": "hf.co/unsloth/gemma-3n-E4B-it-GGUF:UD-Q4_K_XL", 
       "prompt": "Say hello", 
       "stream": false}' | jq -r '.response')

if [ "$TEST_RESPONSE" != "null" ] && [ -n "$TEST_RESPONSE" ]; then
    echo "✅ Model test successful"
    echo "🤖 Model response: $TEST_RESPONSE"
else
    echo "❌ Model test failed"
    exit 1
fi

echo ""
echo "🎉 Installation Complete!"
echo "========================="
echo "✅ Ollama installed and running"
echo "✅ Gemma 3N model downloaded and tested"
echo "✅ PET is ready to use with real AI!"
echo ""
echo "🚀 Next steps:"
echo "1. Open index.html in your browser"
echo "2. Type a request in the heart prompt"
echo "3. Watch as Gemma 3N generates real AI suggestions!"
echo ""
echo "💡 To stop Ollama: kill $OLLAMA_PID"
echo "💡 To restart Ollama: ollama serve" 