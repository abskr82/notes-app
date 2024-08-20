
# Notes App with React + TypeScript + Vite

This project is a minimal Notes application built using React, TypeScript, and Vite. The app allows users to create, edit, and manage notes with features like text formatting, folder management, and persistent storage.

## Features

- **Create and Edit Notes**: Users can create new notes, edit existing ones, and organize them into folders.
- **Text Formatting**: Supports basic text formatting such as bold, italic, underline, and font size adjustments.
- **Folder Management**: Organize notes into different folders for better management.
- **Persistent Storage**: Notes and folders are stored locally, ensuring they persist across sessions.

## Live Demo

The app is deployed on Vercel and can be accessed live at the following URL:
**[Live Demo](https://notes-app-lovat-mu.vercel.app/)**

## Running the Project Locally

To run this project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/notes-app.git
   cd notes-app
   ```

2. **Install dependencies**:
   ```bash
   yarn
   ```

3. **Start the development server**:
   ```bash
   yarn dev
   ```

   The app will be available at `http://localhost:5173`.

4. **Build for production**:
   ```bash
   yarn build
   ```

5. **Preview the production build**:
   ```bash
   yarn preview
   ```

## Testing the Application

This project uses Vitest and React Testing Library (RTL) for unit and integration testing.

### Running Tests

To run the test suite, use the following command:

```bash
yarn test
```
## License

This project is licensed under the MIT License.
