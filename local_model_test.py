#!/usr/bin/env python3
"""
PET Local Model Test Script
Fixes the placeholder path issue and provides comprehensive model testing
"""

import os
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer
import sys

def find_model_directory():
    """Find the model directory in current location"""
    possible_names = [
        "PET-Gemma-3N-2B-enhanced",
        "PET-Gemma-3N-2B-enhanced-merged",
        "fine_tuned_model",
        "model"
    ]
    
    current_dir = os.getcwd()
    print(f"🔍 Searching for model in: {current_dir}")
    
    for name in possible_names:
        path = os.path.join(current_dir, name)
        if os.path.exists(path):
            print(f"✅ Found model directory: {path}")
            return path
    
    print("❌ No model directory found!")
    print("📁 Available directories:")
    for item in os.listdir(current_dir):
        if os.path.isdir(item):
            print(f"  - {item}")
    
    return None

def test_model_loading(model_path):
    """Test loading and inference with the model"""
    print(f"\n📥 Attempting to load model from: {model_path}")
    
    try:
        # Check for config file
        config_path = os.path.join(model_path, "config.json")
        if not os.path.exists(config_path):
            print(f"❌ config.json not found in {model_path}")
            return False
        
        print("📥 Loading tokenizer...")
        tokenizer = AutoTokenizer.from_pretrained(
            model_path, 
            trust_remote_code=True,
            local_files_only=True
        )
        
        # Set pad token if not set
        if tokenizer.pad_token is None:
            tokenizer.pad_token = tokenizer.eos_token
            print("⚠️  Set pad_token to eos_token")
        
        print("📥 Loading model...")
        model = AutoModelForCausalLM.from_pretrained(
            model_path,
            torch_dtype=torch.float16 if torch.cuda.is_available() else torch.float32,
            device_map="auto" if torch.cuda.is_available() else None,
            trust_remote_code=True,
            local_files_only=True
        )
        
        print("✅ Model loaded successfully!")
        
        # Test inference with proper prompt engineering format
        test_prompts = [
            "What are the key principles of effective prompt engineering?",
            "<|im_start|>user\nExplain chain-of-thought prompting.<|im_end|>\n<|im_start|>assistant\n",
            "List 5 advanced prompt engineering techniques:"
        ]
        
        for i, prompt in enumerate(test_prompts, 1):
            print(f"\n🧪 Test {i}: {prompt[:50]}...")
            
            # Tokenize input
            inputs = tokenizer.encode(prompt, return_tensors="pt")
            
            # Generate response
            with torch.no_grad():
                outputs = model.generate(
                    inputs,
                    max_new_tokens=100,
                    num_return_sequences=1,
                    temperature=0.7,
                    do_sample=True,
                    pad_token_id=tokenizer.pad_token_id,
                    eos_token_id=tokenizer.eos_token_id,
                    repetition_penalty=1.1
                )
            
            # Decode response
            response = tokenizer.decode(outputs[0], skip_special_tokens=True)
            
            # Check if response is just padding/repetition
            if len(response.strip()) > len(prompt.strip()) + 10:
                print(f"✅ Response generated:")
                print(f"   {response[len(prompt):].strip()[:200]}...")
            else:
                print(f"⚠️  Short/empty response: {response}")
        
        return True
        
    except Exception as e:
        print(f"❌ Error: {e}")
        print(f"   Error type: {type(e).__name__}")
        return False

def main():
    print("🚀 PET Local Model Test")
    print("=" * 40)
    
    # Find model directory
    model_path = find_model_directory()
    if not model_path:
        print("\n❌ Cannot proceed without model directory")
        print("🔄 Make sure you've downloaded and extracted the model from Colab")
        return
    
    # Test model loading
    success = test_model_loading(model_path)
    
    print("\n" + "=" * 40)
    if success:
        print("🎉 Model test completed successfully!")
        print("✅ Your fine-tuned PET model is working!")
    else:
        print("❌ Model test failed")
        print("🔄 Check the troubleshooting guide")
    
    print("=" * 40)

if __name__ == "__main__":
    main()
