# UniTUM-Frontend: Frontend Application Overview

This README provides an overview of the frontend application structure and instructions for launching the website.

## Project Structure

The frontend is organized as follows:

### Source Directory (`src`)
- **`assets`**: Contains static assets like images, fonts, or other resources.

- **`components`**: Houses reusable React components used across the application:
  - `Footer.tsx`: Website footer component.
  - `Header.tsx`: Website header component.
  - `Mainchat.tsx`: Main chat component.
  - `ModalAdd.tsx`: Modal dialog for adding new items.
  - `ModalDel.tsx`: Modal dialog for deleting items.
  - `ModalSrch.tsx`: Modal dialog for search functionality.
  - `Sidebar.tsx`: Sidebar navigation component.

- **`services`**:
  - `OllamaService.tsx`: Includes utility functions and API-related services for communicating with Ollama via Backend.
  - `ConversationService.tsx`: Includes utility functions and API-related services for creating, deleting, listing, and updating conversations.

- **`App.tsx`**: Entry point of the application, rendering the main UI structure.
- **`App.css`**: Global styles for the application.
- **`index.tsx`**: Root file to bootstrap and render the React app.
- **`vite-env.d.ts`**: TypeScript declaration file for Vite-specific configurations.

## How to Launch the Website

Follow the steps below to set up and run the frontend application:

### Navigate to the Frontend Directory
Open a terminal and go to the frontend folder:

```bash
cd web-app/unitum-frontend
```

### Install Dependencies
Install all required dependencies (only needed during the initial setup):

```bash
npm install
```

### Launch the Website
Start the development server:

```bash
npm run dev
```

### Access the Website
Open the URL provided in the terminal output to access the website.

## Additional Notes

- Ensure **Node.js** and **npm** are installed on your system.
- If you encounter issues, try the following:
  - Delete the `node_modules` folder.
  - Reinstall dependencies:
    
    ```bash
    npm install
    ```
- The development server automatically reloads changes you make to the code.

Feel free to reach out with questions or issues!
