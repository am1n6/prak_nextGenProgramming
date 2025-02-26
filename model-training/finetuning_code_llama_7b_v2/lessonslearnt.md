## Training Parameters

### Dataset and Batch Configuration

- **Dataset size**: `12,480`
- **Per-device train batch size**: `2`
- **Gradient accumulation steps**: `2`
- **Number of GPUs**: `1`
- **Effective batch size**: `per_device_train_batch_size * gradient_accumulation_steps * num_gpus`
- **Steps per epoch**: `dataset_size // effective_batch_size`

### Training Arguments

- **Batch Parameters**:
  - Per-device train batch size: `2`
  - Per-device eval batch size: `4` (double train batch size)
  - Gradient accumulation steps: `2`

- **Optimizer and Learning Rate**:
  - Optimizer: `"paged_adamw_32bit"`
  - Learning rate: `2e-4`
  - FP16: `True`
  - Max gradient norm: `0.3`
  - Warmup ratio: `0.05`
  - LR scheduler type: `"cosine"`

- **Training Duration**:
  - Number of epochs: `3`

- **Evaluation and Logging**:
  - Evaluation strategy: `"steps"`
  - Evaluation steps: `steps_per_epoch // 5` (5 evaluations per epoch)
  - Logging strategy: `"steps"`
  - Logging steps: `steps_per_epoch // 5`

- **Checkpointing**:
  - Save strategy: `"steps"`
  - Save steps: `steps_per_epoch // 5`
  - Save total limit: `2` (retain last 2 checkpoints)
  - Save in SafeTensors format: `True`

- **Output and Reporting**:
  - Output directory: `"./resources/tensorboard"`
  - Report to: `"tensorboard"`
  - Run name: `"codellama7b_finetuning_v2"`

- **Miscellaneous**:
  - Group by length: `True`
  - Gradient checkpointing: `True`
  - Seed: `42`
  - Max sequence length: `1024` (changed for long tests)

### Trainer Initialization

The `SFTTrainer` is initialized with the following:

- **Model**: `model`
- **Training arguments**: `training_args`
- **Train dataset**: `train_dataset["train"]`
- **Eval dataset**: `evaluation_dataset["validation"]`
- **Tokenizer**: `tokenizer`
- **LoRA Configuration**: `lora_config`
- **Dataset text field**: `"text"`
- **Max sequence length**: `1024`

## future Improvement 

1. Number of Epoch must be lower == 1 (with 3 Epochs ==> Overfitting)
2. Learning Rate must be lower (our Objective is to change a little bit in the behaviour) == 1e-5