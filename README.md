# UnitTUM

**UnitTUM** is a web application designed to enhance software testing workflows by leveraging a fine-tuned AI model. This model generates high-quality unit tests for any given Java function. 

UnitTUM enables users to organize their development process efficiently by allowing them to group related functions within a single chat, offering a structured and seamless experience.

---

## Features

- **Generate Unit Tests**  
  Automatically generate high-quality unit tests for any given Java function using a fine-tuned AI model.

- **Project Organization**  
  Group related functions and their generated unit tests into a single chat for better organization.

- **User-Friendly Interface**  
  A sleek and intuitive user interface designed to enhance developer productivity.

- **Persistent Conversations**  
  All chats are stored in a database, allowing users to revisit and manage them later.

- **Specialized AI Model**  
  The AI model is fine-tuned on a large dataset of Java projects, ensuring accuracy and reliability in generating unit tests.

- **Dark and Light Modes**  
  Switch between dark and light modes to optimize comfort during both day and night coding sessions.

---

## Root Directory Structure

The project is organized into the following directories:

- **`web-app/`**  
  Contains the main components of the application:
  - **`unitum-backend/`**: The backend application built with Spring Boot, handling the API, database interactions, and AI model integration.
  - **`unitum-frontend/`**: The frontend application built with React, providing the user interface for interacting with the AI model and organizing unit test generation.

- **`report/`**  
  Includes the project's detailed report, documenting the development process, challenges, and solutions.

- **`presentations/`**  
  Stores all project presentation materials, including PowerPoint slides used for team updates and stakeholder meetings.

- **`model-training/`**  
  Contains all resources related to AI model training, including:
  - Documentation of the training process.
  - Datasets used for fine-tuning the model.
  - The fine-tuned models generated.
  - Scripts for **training**, **evaluating**, and **testing** the AI models.

---

## Technologies Used

UnitTUM leverages modern technologies and frameworks to deliver a seamless and efficient experience:

- **Spring Boot**  
  - Backend framework used to build the RESTful API, manage database interactions, and integrate the AI model.  
  - Provides scalability, modularity, and ease of integration.

- **React**  
  - Frontend library for building an intuitive and dynamic user interface.  
  - Ensures a smooth user experience with features like dark/light mode and real-time chat management.

- **Ollama**  
  - A framework used for managing and deploying AI models efficiently within the application.

- **Hugging Face and CodeLlama**  
  - **CodeLlama-7B**: A pre-trained language model from Hugging Face, specialized in programming-related tasks, fine-tuned specifically for generating Java unit tests, ensuring accurate and relevant test cases tailored to developer needs.  
  - Fine-tuning was conducted using Hugging Face libraries:  
    - **`transformers`**: For model loading, fine-tuning, and deployment.  
    - **`datasets`**: To prepare and process Java-focused training datasets.  
    - **`accelerate`**: For efficient training on GPU hardware.  
    - **`peft` (Parameter-Efficient Fine-Tuning)**: To optimize model fine-tuning with minimal computational resources.

- **MySQL**  
  - Relational database system used to store and manage user conversations and chat history.   
  - Chosen for its reliability, scalability, and ease of integration with Spring Boot.

---

## Installation and Setup

Follow these steps to set up and run UnitTUM locally:

1. **Clone the Repository**  
   Start by cloning the UnitTUM Git repository to your local machine:
   ```bash
   git clone https://gitlab.lrz.de/bpc-ws-2425/sydney.git
   cd sydney
   ```

2. **Setup the Frontend**  
   Navigate to the `WebApp/unitum-frontend/` directory and follow the instructions in its `README.md` to install dependencies and run the React application.

3. **Setup the Backend**  
   Navigate to the `WebApp/unitum-backend/` directory and follow the instructions in its `README.md` to configure and start the Spring Boot application.

---

## Known Issues and Future Enhancements

- **Known Issues**  
  * last Model `UnitTUMCodeLlamav3` cannot handle conversational prompts such as "hello", "how are you?" and generates random code in the response.

- **Future Enhancements**  
  * Frontend formatting of the Model Responses: adding some spaces in the function for better visualisation

---

## License

This project is licensed under the **Sydney TUM** license.

---

## Contact Information

For any inquiries, feedback, or collaboration opportunities, please contact the project Contributors:

  - [Mohamed Amine Ben Abda] – [ge87sox@tum.de]  
  - [Ahmed Soudeni] – [ge87yes@mytum.de]  
  - [Amine Barouni] – [ge84wup@mytum.de]  
  - [Nermine Loukil] – [ge48bod@tum.de]  
