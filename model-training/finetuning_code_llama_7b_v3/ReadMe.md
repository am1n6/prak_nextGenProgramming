# Fine-Tuned Model CodeLlama_7B

This Folder contains the outputs and resources related to the fine-tuning of CodeLlama_7B model on generating JUnit Tests. Below is a description of the folder structure, files, and their purposes.

---

## 📂 Directory Structure

### 1. **Datasets**  
Located in `./resources/dataset`, this directory contains the following datasets used in the fine-tuning process:
- **`llama_format_dataset_train.json`**: Training dataset.
- **`llama_format_dataset_eval.json`**: Evaluation dataset.

### 2. **Model in GGUF Format**  
Located in `./resources/ggufModelFormat`, this directory contains the model converted to **GGUF (Grokker Universal Format)**. This format is used to allow the model to be running on ollama.
To create the ollama Model you have to run the content of the file **`createOllamaModel.sh`** on terminal. make sure you run the shell code in the same directory as the gguf file.

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
### 4. **Lessons Learned (`lessonslearnt.md`)**  
This document contains insights and lessons learned during the fine-tuning process. It includes:
- Current training params
- Observations from training and evaluation.
- Best practices for future fine-tuning projects.
- Areas for improvement.

---

## 💡 NB:
Unfortunately we are unable to push the model trained and its GGuf File in the repository due to their large size.
But you can generate them yourself just by running `convertToGguf.ipynb` file yourself. This does not take you so much time.
if you encounter any problem, feel free to contact us.

---

## 💡 Notes
- make sure to run the scripts in a python virtual environment (.venv)
- Ensure all dependencies for the scripts are installed before running.
- Use a compatible environment for TensorBoard visualizations.
- Refer to `lessonslearnt.md` for troubleshooting common issues.

---

## 📞 Contact
For any questions or feedback, feel free to reach out to the project maintainer.
