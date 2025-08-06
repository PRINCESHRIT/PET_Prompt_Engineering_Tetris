#!/usr/bin/env python3
"""
PET Fine-tuning Script - Simplified Version
Using transformers library for CPU-based training
"""

import json
import torch
from transformers import (
    AutoTokenizer, 
    AutoModelForCausalLM,
    TrainingArguments,
    Trainer,
    DataCollatorForLanguageModeling
)
from datasets import Dataset

def load_training_data():
    """Load PET training data"""
    with open("pet_training_data.json", "r") as f:
        data = json.load(f)
    return Dataset.from_list(data)

def tokenize_function(examples, tokenizer):
    """Tokenize the training data"""
    return tokenizer(
        examples["text"],
        truncation=True,
        padding=True,
        max_length=512,
        return_tensors="pt"
    )

def main():
    print("🚀 Starting PET Fine-tuning...")

    # Load model and tokenizer (using a smaller model for CPU training)
    model_name = "google/gemma-2b"  # Fallback to available model

    print(f"📥 Loading model: {model_name}")
    try:
        tokenizer = AutoTokenizer.from_pretrained(model_name)
        model = AutoModelForCausalLM.from_pretrained(
            model_name,
            torch_dtype=torch.float32,  # CPU compatible
            device_map="cpu"
        )

        # Add pad token if missing
        if tokenizer.pad_token is None:
            tokenizer.pad_token = tokenizer.eos_token

        print("✅ Model loaded successfully")

    except Exception as e:
        print(f"❌ Model loading failed: {e}")
        print("💡 Consider using a different model or install additional dependencies")
        return False

    # Load and tokenize dataset
    print("📊 Preparing dataset...")
    dataset = load_training_data()
    tokenized_dataset = dataset.map(
        lambda x: tokenize_function(x, tokenizer),
        batched=True,
        remove_columns=dataset.column_names
    )

    # Training arguments
    training_args = TrainingArguments(
        output_dir="./pet_finetuned",
        overwrite_output_dir=True,
        num_train_epochs=1,  # Start with 1 epoch
        per_device_train_batch_size=1,
        gradient_accumulation_steps=4,
        warmup_steps=10,
        learning_rate=5e-5,
        logging_steps=5,
        save_steps=50,
        evaluation_strategy="no",
        save_strategy="steps",
        load_best_model_at_end=False,
        report_to=None,  # Disable wandb/tensorboard
    )

    # Data collator
    data_collator = DataCollatorForLanguageModeling(
        tokenizer=tokenizer,
        mlm=False,  # Causal LM, not masked LM
    )

    # Create trainer
    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=tokenized_dataset,
        data_collator=data_collator,
    )

    # Start training
    print("🔥 Starting training...")
    trainer.train()

    # Save the model
    print("💾 Saving model...")
    trainer.save_model("./pet_finetuned_final")
    tokenizer.save_pretrained("./pet_finetuned_final")

    print("✅ Training complete!")
    return True

if __name__ == "__main__":
    success = main()
    if success:
        print("🎉 PET fine-tuning successful!")
    else:
        print("❌ Training failed - check dependencies and model availability")
