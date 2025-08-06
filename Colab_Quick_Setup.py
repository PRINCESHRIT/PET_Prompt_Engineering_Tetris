# ============================================================================
# PET COLAB QUICK SETUP - Copy this entire cell into Google Colab
# ============================================================================

# Step 1: Verify GPU and clone repository
print("🚀 PET Fine-tuning Setup - Google Colab")
print("=" * 50)

# Check GPU
!nvidia-smi
import torch
print(f"✅ CUDA available: {torch.cuda.is_available()}")
if torch.cuda.is_available():
    print(f"✅ GPU device: {torch.cuda.get_device_name(0)}")
else:
    print("⚠️  No GPU detected - Please enable GPU runtime!")
    print("   Go to Runtime → Change runtime type → Hardware accelerator → GPU")

# Clone the PET repository
print("\n📂 Cloning PET repository...")
!git clone https://github.com/PRINCESHRIT/PET_Prompt_Engineering_Tetris.git
%cd PET_Prompt_Engineering_Tetris

print("✅ Repository cloned successfully!")
print("\n📋 Available files:")
!ls -la *.py

# Step 2: Install dependencies (this will take a few minutes)
print("\n📦 Installing Unsloth and dependencies...")
print("⏳ This will take 3-5 minutes...")

!pip install "unsloth[colab-new] @ git+https://github.com/unslothai/unsloth.git"
!pip install --no-deps "trl<0.9.0" peft accelerate bitsandbytes

print("✅ Dependencies installed!")

# Step 3: Load and verify the training script
print("\n🔍 Verifying training script...")
import os
if os.path.exists("PET_Colab_Finetuning.py"):
    print("✅ PET_Colab_Finetuning.py found!")
    
    # Show first few lines to verify
    with open("PET_Colab_Finetuning.py", "r") as f:
        lines = f.readlines()[:10]
        print(f"✅ Script has {len(open('PET_Colab_Finetuning.py').readlines())} lines")
        print("\n📝 Script preview:")
        for i, line in enumerate(lines, 1):
            print(f"{i:2d}: {line.rstrip()}")
else:
    print("❌ Training script not found!")

print("\n" + "=" * 50)
print("🎯 READY TO START FINE-TUNING!")
print("=" * 50)
print("\nNext step: Run the training script:")
print("   %run PET_Colab_Finetuning.py")
print("\n⏱️  Expected training time: 2-3 hours")
print("💾 Model will be saved as: PET-Gemma-3N-2B-enhanced")
print("\n🚨 IMPORTANT: Keep this Colab session active during training!")
