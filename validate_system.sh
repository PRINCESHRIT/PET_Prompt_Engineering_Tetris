#!/bin/bash

echo "🔍 PET Enhanced System Validation"
echo "================================="

# Check for model files
MODEL_FOUND=false
if [ -d "PET-Gemma-3N-2B-enhanced" ]; then
    echo "✅ Model directory: PET-Gemma-3N-2B-enhanced"
    echo "   📊 Size: $(du -sh PET-Gemma-3N-2B-enhanced | cut -f1)"
    echo "   📁 Files: $(find PET-Gemma-3N-2B-enhanced -type f | wc -l | xargs)"
    MODEL_FOUND=true
elif [ -d "PET-Gemma-3N-2B-enhanced-merged" ]; then
    echo "✅ Model directory: PET-Gemma-3N-2B-enhanced-merged"
    echo "   📊 Size: $(du -sh PET-Gemma-3N-2B-enhanced-merged | cut -f1)"
    echo "   📁 Files: $(find PET-Gemma-3N-2B-enhanced-merged -type f | wc -l | xargs)"
    MODEL_FOUND=true
else
    echo "❌ Model directory: Not found"
    echo "   🔄 Download from Colab: unzip ~/Downloads/PET-Gemma-3N-2B-enhanced.zip"
fi

# Check Ollama
if command -v ollama >/dev/null 2>&1; then
    echo "✅ Ollama: Installed"
    
    # Check if our model is deployed
    if ollama list | grep -q "pet-enhanced"; then
        echo "✅ PET Enhanced Model: Deployed"
        
        # Quick functionality test
        echo ""
        echo "🧪 Quick Functionality Test:"
        echo "Prompt: 'Explain few-shot prompting in one sentence.'"
        ollama run pet-enhanced "Explain few-shot prompting in one sentence." --timeout 20
        
        echo ""
        echo "🎉 System Status: FULLY OPERATIONAL"
        
    elif ollama list | grep -q "pet-specialized"; then
        echo "✅ PET Specialized Model: Deployed (older version)"
        echo "🔄 Consider upgrading: ./deploy_pet.sh"
        
    else
        echo "⚠️  PET Model: Not deployed in Ollama"
        if [ "$MODEL_FOUND" = true ]; then
            echo "   🔄 Run deployment: ./deploy_pet.sh"
        else
            echo "   � Download model first, then deploy"
        fi
    fi
else
    echo "❌ Ollama: Not installed"
    echo "   🔄 Install from: https://ollama.ai"
fi

# Check Python environment
echo ""
echo "🐍 Python Environment Check:"
python3 -c "
try:
    import torch, transformers, peft
    print('✅ Core libraries: Available')
    print(f'   PyTorch: {torch.__version__}')
    print(f'   Transformers: {transformers.__version__}')
    print(f'   PEFT: {peft.__version__}')
    if torch.cuda.is_available():
        print('✅ CUDA: Available')
    else:
        print('⚠️  CUDA: Not available (CPU only)')
except ImportError as e:
    print(f'❌ Missing library: {e}')
    print('   🔄 Install: pip install torch transformers peft accelerate bitsandbytes')
"

# Check web interface
if [ -f "index.html" ]; then
    echo "✅ Web interface: Available"
    echo "   🌐 Open: file://$(pwd)/index.html"
else
    echo "⚠️  Web interface: Missing"
fi

echo ""
echo "================================="
echo "📋 Summary:"
if [ "$MODEL_FOUND" = true ] && ollama list | grep -q "pet-enhanced"; then
    echo "🟢 Status: READY FOR PRODUCTION"
    echo "🚀 Your enhanced PET system is fully operational!"
elif [ "$MODEL_FOUND" = true ]; then
    echo "🟡 Status: READY FOR DEPLOYMENT"
    echo "🔄 Run: ./deploy_pet.sh"
else
    echo "🔴 Status: SETUP REQUIRED"
    echo "🔄 Download model from Colab first"
fi
echo "================================="
