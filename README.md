# Project: Image Inpainting Widget

This is a simple drawing application built with React, TypeScript, and Fabric.js. The app includes features such as drawing on a canvas, undo/redo functionality, uploading images, and exporting the canvas.

---

## How to Run the Project Locally

1. **Clone the Repository:**
   ```bash
   git clone <repository-link>
   cd <repository-directory>
   ```

2. **Install Dependencies:**
   Ensure you have `Node.js` and `npm`/`yarn` installed. Then run:
   ```bash
   npm install
   ```
   Or, if you prefer yarn:
   ```bash
   yarn install
   ```

3. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   Or with yarn:
   ```bash
   yarn dev
   ```

4. **Access the App:**
   Open your browser and navigate to `http://localhost:3000`.

---

## Libraries Used

### Dependencies:
- **React**: A JavaScript library for building user interfaces.
- **Fabric.js**: Provides advanced canvas drawing features and simplifies manipulation of canvas elements.
- **Lucide-React**: A collection of beautifully crafted icons for React applications.

### Dev Dependencies:
- **Vite**: A fast development build tool for modern web projects.
- **TypeScript**: Adds static typing to JavaScript for safer and more robust code.
- **TailwindCSS**: A utility-first CSS framework for styling.
- **ESLint**: For linting and enforcing consistent code quality.
- **PostCSS/Autoprefixer**: Ensures cross-browser compatibility.

---

## Challenges Faced and How We Overcame Them

### 1. **Undo/Redo Functionality**
   - I had trouble getting redo to work properly. It was tricky to figure out how to track changes without breaking the flow. After a lot of trial and error, I used a stack to store undo and redo states, and it finally clicked when I cleared the redo stack on new actions. Now it works smoothly!

### 2. **Canvas Performance**
   - The canvas would slow down when there were a lot of objects. I fixed this by simplifying the way objects were cloned and making sure unnecessary re-renders were avoided.

### 3. **Brush Tools and Syncing**
   - Keeping the brush size in sync across the app was frustrating at first. I solved it by managing the brush size with React state, which made everything update properly and consistently.

---

## Live Link

Check out the live version of the project here: [Canvas Drawing App](https://image-widget.netlify.app/).

---

Feel free to fork, clone, and modify this project as needed! 

