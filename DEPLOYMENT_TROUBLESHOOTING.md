# 🔧 PET MODEL DEPLOYMENT TROUBLESHOOTING GUIDE

## 📋 Key Issues Identified:

1. ❌ **Model Path Issue**: Placeholder path `/path/to/your/local/model/PET-Gemma-3N-2B-enhanced` 
2. ❌ **Manual Download Required**: Model files must be downloaded from Colab
3. ❌ **Inference Failures**: Model generating only padding tokens
4. ❌ **LoRA Configuration**: Potential issues with adapter merging

## 🛠️ COMPLETE SOLUTION WORKFLOW

### STEP 1: Download Model from Colab (CRITICAL)

**Copy this into Google Colab to package and download your model:**

```python
import os
import shutil
from google.colab import files

# Check if model directory exists
model_dir = "PET-Gemma-3N-2B-enhanced"
if os.path.exists(model_dir):
    print(f"✅ Model directory found: {model_dir}")
    
    # List contents
    for root, dirs, files in os.walk(model_dir):
        level = root.replace(model_dir, '').count(os.sep)
        indent = ' ' * 2 * level
        print(f"{indent}{os.path.basename(root)}/")
        subindent = ' ' * 2 * (level + 1)
        for file in files:
            print(f"{subindent}{file}")
    
    # Create comprehensive archive
    print("\n📦 Creating downloadable archive...")
    shutil.make_archive("PET-Gemma-3N-2B-enhanced", 'zip', model_dir)
    
    # Download
    print("🔄 Starting download...")
    files.download("PET-Gemma-3N-2B-enhanced.zip")
    print("✅ Download complete!")
    
else:
    print("❌ Model directory not found!")
    print("Available directories:")
    print(os.listdir('.'))
```

### STEP 2: Verify Local Model Structure

**After downloading, run this on your local machine:**

```bash
# Extract model
unzip ~/Downloads/PET-Gemma-3N-2B-enhanced.zip -d ./

# Verify structure
echo "📂 Model directory structure:"
find PET-Gemma-3N-2B-enhanced -type f | head -20

# Check for required files
echo "🔍 Checking for essential files:"
ls -la PET-Gemma-3N-2B-enhanced/ | grep -E "(config|model|tokenizer)"
```

### STEP 3: Fixed Local Inference Script

Create this corrected inference test:

```python
#!/usr/bin/env python3
# local_model_test.py

import os
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer
from peft import PeftModel
import sys

def test_local_model():
    # CRITICAL: Update this path to your actual model location
    base_path = os.path.join(os.getcwd(), "PET-Gemma-3N-2B-enhanced")
    
    print(f"🔍 Looking for model at: {base_path}")
    
    if not os.path.exists(base_path):
        print(f"❌ Model not found at {base_path}")
        print("📁 Current directory contents:")
        print(os.listdir('.'))
        return False
    
    try:
        print("📥 Loading tokenizer...")
        tokenizer = AutoTokenizer.from_pretrained(base_path, trust_remote_code=True)
        
        print("📥 Loading model...")
        model = AutoModelForCausalLM.from_pretrained(
            base_path,
            torch_dtype=torch.float16 if torch.cuda.is_available() else torch.float32,
            device_map="auto" if torch.cuda.is_available() else None,
            trust_remote_code=True
        )
        
        print("✅ Model loaded successfully!")
        
        # Test inference
        test_prompt = "What are the key principles of effective prompt engineering?"
        print(f"\n🧪 Testing with prompt: {test_prompt}")
        
        inputs = tokenizer.encode(test_prompt, return_tensors="pt")
        
        with torch.no_grad():
            outputs = model.generate(
                inputs,
                max_length=150,
                num_return_sequences=1,
                temperature=0.7,
                do_sample=True,
                pad_token_id=tokenizer.eos_token_id
            )
        
        response = tokenizer.decode(outputs[0], skip_special_tokens=True)
        print(f"\n✅ Model response:\n{response}")
        
        return True
        
    except Exception as e:
        print(f"❌ Error loading model: {e}")
        return False

if __name__ == "__main__":
    success = test_local_model()
    if success:
        print("\n🎉 Model is working correctly!")
    else:
        print("\n❌ Model test failed - check deployment steps")
```

### STEP 4: Alternative Ollama Deployment (Recommended)

**Instead of direct model loading, use Ollama for easier deployment:**

```bash
# Create Ollama-compatible Modelfile
cat > Modelfile.pet << 'EOF'
FROM ./PET-Gemma-3N-2B-enhanced

PARAMETER temperature 0.3
PARAMETER top_p 0.9
PARAMETER top_k 40
PARAMETER num_ctx 2048

SYSTEM """You are PET (Prompt Engineering Tetris), an expert AI assistant specialized in prompt engineering. You have been fine-tuned on 200 specialized examples and have 38 advanced functional rules. Provide detailed, expert-level guidance on prompt engineering techniques, best practices, and optimization strategies."""

TEMPLATE """<|im_start|>system
{{ .System }}<|im_end|>
<|im_start|>user
{{ .Prompt }}<|im_end|>
<|im_start|>assistant
"""
EOF

# Deploy to Ollama
ollama create pet-enhanced -f Modelfile.pet

# Test deployment
echo "🧪 Testing Ollama deployment..."
ollama run pet-enhanced "Test prompt engineering knowledge"
```

### STEP 5: Comprehensive Deployment Verification

```bash
#!/bin/bash
# verify_deployment.sh

echo "🔍 PET Model Deployment Verification"
echo "===================================="

# Check model files
if [ -d "PET-Gemma-3N-2B-enhanced" ]; then
    echo "✅ Model directory: Found"
    echo "📊 Directory size: $(du -sh PET-Gemma-3N-2B-enhanced | cut -f1)"
    echo "📁 Files count: $(find PET-Gemma-3N-2B-enhanced -type f | wc -l)"
else
    echo "❌ Model directory: Missing"
    echo "🔄 Download from Colab first"
fi

# Check Ollama deployment
if command -v ollama >/dev/null 2>&1; then
    echo "✅ Ollama: Installed"
    
    if ollama list | grep -q "pet-enhanced"; then
        echo "✅ PET Enhanced Model: Deployed"
        echo "🧪 Running quick test..."
        ollama run pet-enhanced "What is prompt engineering?" --timeout 30
    else
        echo "⚠️  PET Enhanced Model: Not deployed"
    fi
else
    echo "❌ Ollama: Not installed"
fi

echo "===================================="
```

## 🎯 RECOMMENDED DEPLOYMENT PATH

1. **Download model from Colab** ✅ (Use Step 1 script)
2. **Verify local files** ✅ (Use Step 2 commands)
3. **Deploy via Ollama** ✅ (Use Step 4 - easier than direct loading)
4. **Test functionality** ✅ (Use Step 5 verification)

## 🚨 CRITICAL SUCCESS FACTORS

- ✅ **Correct model path**: No placeholders, actual file locations
- ✅ **Complete file download**: All model files from Colab
- ✅ **Proper tokenizer setup**: Essential for inference
- ✅ **Ollama deployment**: Simpler than direct PyTorch loading

This approach should resolve all the identified issues! 🚀
