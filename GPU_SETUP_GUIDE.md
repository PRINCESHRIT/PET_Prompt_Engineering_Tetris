# 🚨 ENABLE GPU FIRST - IMPORTANT STEPS 🚨

## Step 1: Enable GPU Runtime in Google Colab

**Before running the training script, you MUST enable GPU:**

1. **Go to Runtime menu** → **Change runtime type**
2. **Hardware accelerator** → Select **GPU** (T4, A100, or V100)
3. **Save**
4. **The runtime will restart** - this is normal
5. **Re-run the setup script** after restart

## Step 2: Verify GPU is Working

After enabling GPU, you should see:
```
✅ CUDA available: True
✅ GPU device: Tesla T4 (or A100/V100)
```

## Step 3: Fixed Installation Command

If you get Unsloth installation errors, try this alternative in a new cell:

```python
# Alternative Unsloth installation
!pip install unsloth==2025.8.1
!pip install --no-deps "trl<0.9.0" peft accelerate bitsandbytes
```

## Step 4: Manual Training Script Execution

If the automatic setup fails, you can run the training manually:

```python
# Change to the repository directory
import os
os.chdir('/content/PET_Prompt_Engineering_Tetris')

# Verify we're in the right place
!pwd
!ls -la *.py

# Run the training script
%run PET_Colab_Finetuning.py
```

## Common Issues & Solutions:

### Issue: "nvidia-smi: command not found"
**Solution:** Enable GPU runtime (see Step 1)

### Issue: "CUDA available: False"
**Solution:** Enable GPU runtime and restart (see Step 1)

### Issue: Unsloth installation fails
**Solutions:**
- Try: `!pip install unsloth==2025.8.1`
- Or: `!pip install "unsloth @ git+https://github.com/unslothai/unsloth.git"`

### Issue: "Training data not found"
**Solution:** This is OK - the training script has embedded data

## Expected Training Time:
- **With GPU (T4):** 2-3 hours
- **With GPU (A100/V100):** 1-2 hours
- **Without GPU:** Not recommended (20+ hours)

## Next Steps After GPU Enablement:
1. Re-run the updated setup script
2. Start training with: `%run PET_Colab_Finetuning.py`
3. Monitor training progress
4. Deploy with the generated model files
