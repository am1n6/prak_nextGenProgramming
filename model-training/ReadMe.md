# Welcome to model-training

This README provides an overview of the key configurations used for training the models with quantization and LoRA techniques.

## Quantisation Parameters

- **load_in_4bit**: `True`  
- **bnb_4bit_quant_type**: `"nf4"`  
- **bnb_4bit_compute_dtype**: `torch.float16`  
- **bnb_4bit_use_double_quant**: `True`  
- **device_map**: `"cuda:0"`  
- **use_safetensors**: `True`  
- **trust_remote_code**: `True`  
- **use_auth_token**: `hf_token`  
- **Gradient checkpointing**: Enabled  
- **use_cache**: `False`  

## LoRA Parameters

- **lora_alpha**: `32`  
- **lora_dropout**: `0.1`  
- **lora_r**: `16`  
- **bias**: `"none"`  
- **task_type**: `"CAUSAL_LM"`  

## Other paramters

other parameters vary between models. You can find the specific parameters of each model in file `lessonslearnd.md`