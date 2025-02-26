# Fine-Tuned Model Falcon_7B

This Folder contains the outputs and resources related to the fine-tuning of Falcon_7B model on generatin JUnit Tests. Below is a description of the folder structure, files, and their purposes.

---

## 📂 Directory Structure

### 1. **Datasets**  
Located in `./resources/dataset`, this directory contains the following datasets used in the fine-tuning process:
- **`falcon_format_dataset_train.json`**: Training dataset.
- **`falcon_format_dataset_eval.json`**: Evaluation dataset.

### 3. **TensorBoard Metrics**  
Located in `./resources/tensorboard`, this directory contains logs and visualizations of the training process, which can be explored using **TensorBoard**.

### 4. **Trained Model**  
Located in `./resources/trained_model`, this directory contains the **trained model**, where the **base model** has been merged with the **LoRA adapters** for fine-tuning. This model is in the huggingface Format and ready for further usage or deployment.

### 5. **LoRA Adapter Parameters**  
Located in `./resources/trained_model_adapt_param`, this directory contains the **LoRA adapter parameters** used in the fine-tuning process.

---

## 📄 Files

### 1. **Training Script (`training.ipynb`)**  
This file is the main script for training the model. It handles:
- Loading datasets.
- Applying LoRA adapters.
- Training and saving the model.

### 2. **Metrics Visualization Script (`metrics.ipynb`)**  
This file is used for visualizing metrics such as loss and accuracy during training. It processes the logs in `./resources/tensorboard` for visualization with **TensorBoard**.

### 3. **Model Conversion Script (`convertToGguf.ipynb`)**  
This script merges the changed Lora adapters with the base model from hf and converts its format from **Hugging Face format** to **GGUF format**, ensuring compatibility with Ollama.
NB: We have not found a solution to convert the falcon model from hf format to .gguf file.
llama.cpp repository cannot help... 
But with the script, you can merge the lora adapter with the base model.

### 4. **Lessons Learned (`lessonslearnt.md`)**  
This document contains insights and lessons learned during the fine-tuning process. It includes:
- Current parameters of finetuning
- Observations from training and evaluation.
- Best practices for future fine-tuning projects.
- Areas for improvement.

---

## 💡 Notes
- make sure to run the scripts in a python virtual environment (.venv)
- Ensure all dependencies for the scripts are installed before running.
- Use a compatible environment for TensorBoard visualizations.
- Refer to `lessonslearnt.md` for troubleshooting common issues.

---

## 📞 Contact
For any questions or feedback, feel free to reach out to the project maintainer.
