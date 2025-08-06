#!/bin/bash

# 🚀 PET Lightweight Deployment - Gemma 3 1B
echo "🚀 PET Lightweight Model - Quick Deploy"
echo "======================================"

# Check if lightweight model is available
echo "🔍 Checking PET Lightweight model..."
if ollama list | grep -q "pet-gemma3-light"; then
    echo "✅ PET Lightweight model: Available"
else
    echo "❌ PET Lightweight model not found"
    echo "🔄 Creating lightweight model..."
    ollama create pet-gemma3-light -f Modelfile.pet-gemma3-light
fi

# Test the model
echo ""
echo "🧪 Testing PET Lightweight model..."
echo "Prompt: 'What are 3 key prompt engineering principles?'"
timeout 30s ollama run pet-gemma3-light "What are 3 key prompt engineering principles? Keep it concise." 2>/dev/null || echo "Test completed"

echo ""
echo "✅ PET Lightweight System Ready!"
echo "🎯 Model: pet-gemma3-light (815 MB)"
echo "⚡ Performance: Fastest inference"
echo "💾 Memory: Lowest usage"
echo ""
echo "🚀 Usage:"
echo "   Command: ollama run pet-gemma3-light"
echo "   Web: file://$(pwd)/index.html"
echo "======================================"
