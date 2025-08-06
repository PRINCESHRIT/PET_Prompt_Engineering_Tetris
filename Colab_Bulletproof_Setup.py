# ============================================================================
# PET COLAB BULLETPROOF SETUP - Copy this entire cell into Google Colab
# ============================================================================

print("🚀 PET Fine-tuning Complete Setup - Google Colab")
print("=" * 60)

# Step 1: Check and enable GPU
print("\n🔍 Step 1: GPU Detection...")
try:
    !nvidia-smi
    gpu_cmd_available = True
except:
    gpu_cmd_available = False

import torch
cuda_available = torch.cuda.is_available()

if cuda_available and gpu_cmd_available:
    print(f"✅ GPU Ready: {torch.cuda.get_device_name(0)}")
    print(f"✅ CUDA Available: {cuda_available}")
else:
    print("⚠️  NO GPU DETECTED!")
    print("🚨 CRITICAL: You MUST enable GPU runtime:")
    print("   1. Runtime → Change runtime type")
    print("   2. Hardware accelerator → GPU")
    print("   3. Save and restart")
    print("   4. Re-run this cell after restart")
    print("\n❌ Training without GPU will take 20+ hours!")

# Step 2: Clone repository with bulletproof error handling
print("\n📂 Step 2: Repository Setup...")
import os

# Always start from /content and clean up
os.chdir('/content')

# Remove any existing directory
if os.path.exists('PET_Prompt_Engineering_Tetris'):
    !rm -rf PET_Prompt_Engineering_Tetris
    print("🗑️  Removed existing directory")

# Clone repository with proper error handling
repository_ready = False
try:
    !git clone https://github.com/PRINCESHRIT/PET_Prompt_Engineering_Tetris.git
    
    # Verify cloning worked
    if os.path.exists('/content/PET_Prompt_Engineering_Tetris'):
        os.chdir('/content/PET_Prompt_Engineering_Tetris')
        print(f"✅ Repository cloned to: {os.getcwd()}")
        
        # Verify training files exist
        if os.path.exists('PET_Colab_Finetuning.py'):
            repository_ready = True
            print("✅ Training script found!")
            !ls -la *.py
        else:
            print("❌ Training script missing after clone!")
            
    else:
        print("❌ Repository directory not created!")
        
except Exception as e:
    print(f"❌ Repository cloning failed: {e}")

if not repository_ready:
    print("\n🔄 MANUAL SOLUTION:")
    print("   1. Go to: https://github.com/PRINCESHRIT/PET_Prompt_Engineering_Tetris")
    print("   2. Click 'Code' → 'Download ZIP'")
    print("   3. Upload ZIP to Colab using file browser (📁)")
    print("   4. Extract and try again")

# Step 3: Install dependencies with multiple fallback strategies
print("\n📦 Step 3: Installing Dependencies...")

if cuda_available and gpu_cmd_available:
    print("🚀 Installing GPU-optimized versions...")
    
    # Strategy 1: Latest compatible Unsloth
    try:
        !pip install unsloth==2025.8.1
        !pip install --no-deps "trl<0.9.0" peft accelerate bitsandbytes
        print("✅ Primary GPU installation successful!")
        deps_installed = True
    except:
        print("⚠️  Primary installation failed, trying fallback...")
        deps_installed = False
    
    # Strategy 2: Alternative installation
    if not deps_installed:
        try:
            !pip install torch transformers datasets accelerate peft bitsandbytes
            !pip install --no-deps "trl<0.9.0"
            print("✅ Fallback GPU installation successful!")
            deps_installed = True
        except:
            print("❌ GPU installation failed!")
            deps_installed = False
else:
    print("⚠️  Installing CPU-only versions (NOT recommended for training)...")
    try:
        !pip install torch transformers datasets accelerate peft
        !pip install --no-deps "trl<0.9.0"
        print("✅ CPU dependencies installed (training will be very slow!)")
        deps_installed = True
    except:
        print("❌ Even CPU installation failed!")
        deps_installed = False

# Step 4: Final verification and instructions
print("\n🔍 Step 4: Final Verification...")

# Check current working directory
print(f"📍 Current directory: {os.getcwd()}")

# Check training files
script_ready = os.path.exists("PET_Colab_Finetuning.py")
if script_ready:
    with open("PET_Colab_Finetuning.py", "r") as f:
        script_lines = len(f.readlines())
    print(f"✅ Training script: {script_lines} lines")
else:
    print("❌ Training script: MISSING")

# Check training data
if os.path.exists("pet_complete_training_data.json"):
    import json
    with open("pet_complete_training_data.json", "r") as f:
        data = json.load(f)
    print(f"✅ Training data: {len(data)} examples")
else:
    print("⚠️  Training data: Will use embedded data")

# Final status report
print("\n" + "=" * 60)
all_ready = cuda_available and gpu_cmd_available and repository_ready and script_ready and deps_installed

if all_ready:
    print("🎯 EVERYTHING READY FOR FINE-TUNING!")
    print("✅ GPU: Enabled and working")
    print("✅ Repository: Cloned successfully") 
    print("✅ Dependencies: Installed")
    print("✅ Training Script: Ready")
    
    print("\n🚀 START TRAINING NOW:")
    print("━" * 40)
    print("Copy this into a NEW CELL:")
    print("%run PET_Colab_Finetuning.py")
    print("━" * 40)
    print("\n⏱️  Expected time: 2-3 hours with GPU")
    print("💾 Output: PET-Gemma-3N-2B-enhanced model")
    print("🔄 Progress will be shown during training")
    
else:
    print("❌ SETUP INCOMPLETE - Fix these issues:")
    if not (cuda_available and gpu_cmd_available):
        print("   🔧 Enable GPU runtime and restart")
    if not repository_ready:
        print("   🔧 Repository cloning failed - try manual upload")
    if not script_ready:
        print("   🔧 Training script missing")
    if not deps_installed:
        print("   🔧 Dependencies installation failed")
    
    print("\n🔄 After fixing issues, re-run this entire cell")

print("\n🚨 KEEP COLAB ACTIVE during 2-3 hour training!")
print("📱 Enable browser notifications to monitor progress")
print("💡 Tip: Use 'Runtime → Manage sessions' to monitor")
print("=" * 60)
