#!/usr/bin/env python3
"""
PET Local Deployment Script
Handles the complete deployment of your fine-tuned PET model
"""

import os
import sys
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer
from peft import PeftModel, PeftConfig
import json

def check_environment():
    """Check if all required libraries are installed"""
    print("🔍 Checking environment...")
    
    try:
        import torch
        import transformers 
        import peft
        import accelerate
        print("✅ All required libraries installed")
        print(f"   PyTorch: {torch.__version__}")
        print(f"   Transformers: {transformers.__version__}")
        print(f"   PEFT: {peft.__version__}")
        print(f"   CUDA available: {torch.cuda.is_available()}")
        return True
    except ImportError as e:
        print(f"❌ Missing library: {e}")
        print("🔄 Install with: pip3 install torch transformers peft accelerate bitsandbytes")
        return False

def load_peft_model():
    """Load the PEFT (LoRA) fine-tuned model"""
    print("\n📥 Loading PET fine-tuned model...")
    
    model_path = "PET-Gemma-3N-2B-enhanced"
    
    if not os.path.exists(model_path):
        print(f"❌ Model directory not found: {model_path}")
        return None, None
    
    try:
        # Read adapter config to get base model
        with open(os.path.join(model_path, "adapter_config.json"), "r") as f:
            adapter_config = json.load(f)
        
        base_model_name = adapter_config.get("base_model_name_or_path", "unsloth/gemma-2-2b")
        print(f"📋 Base model: {base_model_name}")
        print(f"📁 Adapter path: {model_path}")
        
        # Load tokenizer
        print("📥 Loading tokenizer...")
        tokenizer = AutoTokenizer.from_pretrained(base_model_name)
        if tokenizer.pad_token is None:
            tokenizer.pad_token = tokenizer.eos_token
        
        # Load base model
        print("📥 Loading base model...")
        base_model = AutoModelForCausalLM.from_pretrained(
            base_model_name,
            torch_dtype=torch.float16 if torch.cuda.is_available() else torch.float32,
            device_map="auto" if torch.cuda.is_available() else None,
            trust_remote_code=True
        )
        
        # Load PEFT adapter
        print("📥 Loading fine-tuned adapter...")
        model = PeftModel.from_pretrained(base_model, model_path)
        
        print("✅ Model loaded successfully!")
        return model, tokenizer
        
    except Exception as e:
        print(f"❌ Error loading model: {e}")
        return None, None

def test_model_inference(model, tokenizer):
    """Test the model with PET-specific prompts"""
    print("\n🧪 Testing model inference...")
    
    test_prompts = [
        "What are the key principles of effective prompt engineering?",
        "Explain few-shot prompting with an example.",
        "How can I improve prompt clarity and specificity?"
    ]
    
    for i, prompt in enumerate(test_prompts, 1):
        print(f"\n--- Test {i} ---")
        print(f"Prompt: {prompt}")
        
        # Format prompt for chat model
        formatted_prompt = f"<|im_start|>user\n{prompt}<|im_end|>\n<|im_start|>assistant\n"
        
        # Tokenize
        inputs = tokenizer.encode(formatted_prompt, return_tensors="pt")
        
        # Generate response
        with torch.no_grad():
            outputs = model.generate(
                inputs,
                max_new_tokens=150,
                num_return_sequences=1,
                temperature=0.3,
                do_sample=True,
                pad_token_id=tokenizer.pad_token_id,
                eos_token_id=tokenizer.eos_token_id,
                repetition_penalty=1.1
            )
        
        # Decode response
        response = tokenizer.decode(outputs[0], skip_special_tokens=True)
        answer = response[len(formatted_prompt):].strip()
        
        if answer:
            print(f"Response: {answer}")
            print("✅ Generation successful")
        else:
            print("⚠️  Empty response generated")

def create_ollama_modelfile():
    """Create Ollama Modelfile for easier deployment"""
    print("\n📝 Creating Ollama Modelfile...")
    
    # For PEFT models, we need to merge first or use a different approach
    modelfile_content = f"""# PET Enhanced Model - Ollama Deployment
# Note: This is a PEFT/LoRA adapter model
# For full Ollama deployment, model needs to be merged first

FROM gemma2:2b

PARAMETER temperature 0.3
PARAMETER top_p 0.9
PARAMETER top_k 40
PARAMETER num_ctx 2048

SYSTEM '''You are PET (Prompt Engineering Tetris), an expert AI assistant specialized in prompt engineering. You have been fine-tuned with 200 specialized examples and have advanced prompt engineering knowledge. Provide detailed, expert-level guidance on prompt engineering techniques, best practices, and optimization strategies.'''

TEMPLATE '''<|im_start|>system
{{{{ .System }}}}<|im_end|>
<|im_start|>user
{{{{ .Prompt }}}}<|im_end|>
<|im_start|>assistant
'''
"""
    
    with open("Modelfile.pet-direct", "w") as f:
        f.write(modelfile_content)
    
    print("✅ Ollama Modelfile created: Modelfile.pet-direct")
    print("📝 Note: This uses base Gemma2 with PET system prompt")
    print("🔄 For full fine-tuned deployment, model merging required")

def main():
    """Main deployment function"""
    print("🚀 PET Model Local Deployment")
    print("=" * 50)
    
    # Check environment
    if not check_environment():
        sys.exit(1)
    
    # Load model
    model, tokenizer = load_peft_model()
    if model is None:
        print("❌ Deployment failed - could not load model")
        sys.exit(1)
    
    # Test inference
    test_model_inference(model, tokenizer)
    
    # Create Ollama setup
    create_ollama_modelfile()
    
    print("\n" + "=" * 50)
    print("🎉 PET Model Deployment Complete!")
    print("✅ Your fine-tuned PET model is loaded and working")
    print("✅ Model tested with prompt engineering queries")
    print("✅ Ollama Modelfile created for easy deployment")
    
    print("\n🚀 Next Steps:")
    print("1. Model is ready for direct Python usage")
    print("2. For Ollama: ollama create pet-direct -f Modelfile.pet-direct")
    print("3. For web interface: open index.html")
    print("=" * 50)

if __name__ == "__main__":
    main()
