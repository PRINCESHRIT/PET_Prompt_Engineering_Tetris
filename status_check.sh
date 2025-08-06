#!/bin/bash

echo "🎯 PET Enhanced System Status Check"
echo "=================================="

# Check if model file exists
if [ -d "PET-Gemma-3N-2B-enhanced" ]; then
    echo "✅ Fine-tuned model: Found"
else
    echo "❌ Fine-tuned model: Not found - Download from Colab first"
fi

# Check Ollama
if command -v ollama &> /dev/null; then
    echo "✅ Ollama: Installed"
    
    # Check if PET model is deployed
    if ollama list | grep -q "pet-specialized"; then
        echo "✅ PET specialized model: Deployed"
        echo "✅ System: Ready for production!"
        
        # Quick test
        echo ""
        echo "🧪 Quick functionality test:"
        echo "Testing prompt engineering capabilities..."
        ollama run pet-specialized "What are the key principles of effective prompt engineering?" --timeout 10
        
    else
        echo "⚠️  PET specialized model: Not deployed"
        echo "🔄 Run: ./deploy_pet.sh"
    fi
else
    echo "❌ Ollama: Not installed"
    echo "🔄 Install: https://ollama.ai"
fi

# Check web interface
if [ -f "index.html" ]; then
    echo "✅ PET interface: Available"
    echo "🌐 Open: file://$(pwd)/index.html"
else
    echo "⚠️  PET interface: Missing"
fi

echo ""
echo "🚀 Next steps:"
echo "1. Download model from Colab if not done"
echo "2. Run ./deploy_pet.sh to deploy"
echo "3. Open index.html to use enhanced PET"
echo "=================================="
