# UniTUM-Backend: Spring Boot Application

This README provides a guide to setting up and running a Spring Boot application with the following features:

- MySQL database configuration
- Ollama model configuration
- Running the application locally

---

## Prerequisites

Ensure the following tools are installed on your machine:

1. **Java Development Kit (JDK) 17 or above**
    - Download: [Oracle JDK](https://www.oracle.com/java/technologies/javase-downloads.html) or [OpenJDK](https://openjdk.org/)
2. **IntelliJ IDEA Community Edition**
    - Download: [IntelliJ IDEA](https://www.jetbrains.com/idea/download/)
3. **MySQL**
    - Download: [MySQL Community Server](https://dev.mysql.com/downloads/)
4. **Ollama Server**
   - Download: [Ollama Server](https://ollama.com/download).
5. **Git** (for cloning the repository)
    - Download: [Git](https://git-scm.com/)

---

## Setting Up the MySQL Database

### STEP 1

1. **Create a new user in MySQL Server and grant them all privileges**.
   Run the following commands in MySQL Server:
   ```sql
   CREATE USER 'sydney'@'localhost' IDENTIFIED BY 'tum';
   GRANT ALL PRIVILEGES ON *.* TO 'sydney'@'localhost';
   FLUSH PRIVILEGES;
   exit;
   ```

### STEP 2

2. **Set up a new connection with this user in MySQL Workbench**:
   - **User**: `sydney`
   - **Password**: `tum`
   - **Hostname**: `localhost`
   - **Port**: `3306`

### STEP 3

3. **Create a new database** using the connection:
   ```sql
   CREATE DATABASE unitum_db;
   ```

### STEP 4

4. **Update `application.properties`**
   Configure the `src/main/resources/application.properties` file with the database details:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/unitum_db
   spring.datasource.username=sydney
   spring.datasource.password=tum

   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
   ```

5. **Test the Database Connection**
   Ensure that MySQL is running and the database credentials are correct.

---

## Configuring Ollama Model

1. **Install Ollama**
    - Follow the [Ollama installation guide](https://ollama.com/download).

2. **Configure the Ollama Model**
    - Ensure the necessary model is installed locally or accessible.
    - Update the `application.properties` file with Ollama-specific configurations:
      ```properties
      spring.ai.ollama.chat.model=unitTUMCodeLlamaV3
      ```

3. **Verify the Model Integration**
    - Check if the application can access the model and load it correctly.
---

## Running the Application Locally

1. **Clone the Repository**
   ```bash
   git clone https://gitlab.lrz.de/bpc-ws-2425/sydney.git
   ```

2. **Import the Project into IntelliJ IDEA**
    - Open IntelliJ IDEA.
    - Click on `File > Open` and select the project directory `sydney/web-app/unitum-backend`
    - Wait for IntelliJ to index the project and download dependencies.

3. **Build the Application**
    - Open the `Maven` tool window in IntelliJ (usually on the right-hand side).
    - Click on `Reload All Maven Projects` to ensure all dependencies are resolved.

4. **Run the Application**
    - Locate the `UnitumBackendApplication` class in the `src/main/java` directory.
    - Right-click on the class and select `Run`.

5. **Access the Application**
    - The application will be available at: [http://localhost:8080](http://localhost:8080)

6. **Logs and Testing**
    - Check the console logs in IntelliJ for any issues during startup.
    - Use tools like Postman or a browser to test the API endpoints.

---

Feel free to reach out if you encounter any issues!
