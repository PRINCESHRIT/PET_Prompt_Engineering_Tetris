
# PET Fine-tuning in Google Colab - GPU Accelerated
# ================================================

# 1. GPU Setup Verification
!nvidia-smi
import torch
print(f"CUDA available: {torch.cuda.is_available()}")
print(f"GPU device: {torch.cuda.get_device_name(0) if torch.cuda.is_available() else 'No GPU'}")

# 2. Install Unsloth and dependencies
!pip install "unsloth[colab-new] @ git+https://github.com/unslothai/unsloth.git"
!pip install --no-deps "trl<0.9.0" peft accelerate bitsandbytes

# 3. Import required libraries
from unsloth import FastLanguageModel
from datasets import Dataset
from trl import SFTTrainer
from transformers import TrainingArguments
import torch
import json

# 4. Load PET training dataset (200 examples)
training_data = [
    # Our complete 200-example dataset would be loaded here
    {"text": "<|im_start|>system\nYou are PET..."},  # Full examples
    # ... (remaining 199 examples)
]

print(f"✅ Loaded {len(training_data)} training examples")

# 5. Load Gemma 3N 2B model with 4-bit quantization
model, tokenizer = FastLanguageModel.from_pretrained(
    model_name="unsloth/gemma-3n-2b-bnb-4bit",
    max_seq_length=1024,
    dtype=None,  # Auto-detect
    load_in_4bit=True,
)

print("✅ Model loaded with 4-bit quantization")

# 6. Configure LoRA for fine-tuning
model = FastLanguageModel.get_peft_model(
    model,
    r=8,  # LoRA rank
    target_modules=["q_proj", "k_proj", "v_proj", "o_proj",
                   "gate_proj", "up_proj", "down_proj"],
    lora_alpha=16,
    lora_dropout=0.1,
    bias="none",
    use_gradient_checkpointing="unsloth",
    random_state=3407,
)

print("✅ LoRA configuration applied")

# 7. Prepare dataset
dataset = Dataset.from_list(training_data)

# 8. Training configuration
trainer = SFTTrainer(
    model=model,
    tokenizer=tokenizer,
    train_dataset=dataset,
    dataset_text_field="text",
    max_seq_length=1024,
    dataset_num_proc=2,
    packing=False,
    args=TrainingArguments(
        per_device_train_batch_size=2,
        gradient_accumulation_steps=4,
        warmup_steps=10,
        max_steps=200,  # Full training
        learning_rate=1e-4,
        fp16=not torch.cuda.is_bf16_supported(),
        bf16=torch.cuda.is_bf16_supported(),
        logging_steps=10,
        optim="adamw_8bit",
        weight_decay=0.01,
        lr_scheduler_type="linear",
        seed=3407,
        output_dir="./pet_specialized",
        save_strategy="steps",
        save_steps=50,
        push_to_hub=True,  # Save to Hugging Face Hub
        hub_model_id="your-username/pet-gemma-3n-specialized"
    ),
)

# 9. Execute training
print("🔥 Starting PET specialization training...")
trainer.train()

# 10. Save the specialized model
model.save_pretrained("pet_specialized_final")
tokenizer.save_pretrained("pet_specialized_final")

print("✅ PET specialized model training complete!")

# 11. Test the specialized model
FastLanguageModel.for_inference(model)
inputs = tokenizer(
    "<|im_start|>system\nYou are PET (Prompt Engineering Tetris)...\n<|im_start|>user\nHelp me improve this prompt: 'Write a story'<|im_end|>\n<|im_start|>assistant\n",
    return_tensors="pt"
).to("cuda")

outputs = model.generate(**inputs, max_new_tokens=500, temperature=0.3)
response = tokenizer.decode(outputs[0], skip_special_tokens=True)
print("🎯 Specialized model response:", response)
