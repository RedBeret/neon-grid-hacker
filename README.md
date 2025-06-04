# Neon Grid Hacker

Neon Grid Hacker is an immersive puzzle game with a cyberpunk aesthetic. Players navigate an isometric grid, hacking into and solving various types of nodes (loops, conditionals, recursive functions) to progress. The game offers multiple difficulty tiers, from "easy" to "master", challenging players to achieve high scores and unlock new levels. It features a sleek, neon-lit interface, sound effects to enhance the hacking experience, and a helpful tutorial to get new players started.

## Technologies Used

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Development

To get started with development:

1.  **Clone the repository:**
    ```sh
    git clone <YOUR_GIT_URL>
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd neon-grid-hacker
    ```
3.  **Install dependencies:**
    ```sh
    npm install
    ```
    Alternatively, if you use Bun:
    ```sh
    bun install
    ```
4.  **Start the development server:**
    ```sh
    npm run dev
    ```
    Or with Bun:
    ```sh
    bun dev
    ```

This will start the development server, typically on `http://localhost:5173`.

## Available Scripts

In the project directory, you can run:

- `npm run dev` or `bun dev`: Runs the app in development mode.
- `npm run build` or `bun build`: Builds the app for production to the `dist` folder.
- `npm run lint` or `bun lint`: Lints the project files using ESLint.
- `npm run preview` or `bun preview`: Serves the production build locally for preview.

## Deploying to GitHub Pages

This project is configured for deployment to GitHub Pages.

1.  **Set the `homepage` field in `package.json`:**
    Open your `package.json` and add or update the `homepage` field to reflect your GitHub Pages URL:
    ```json
    "homepage": "https://<YOUR_USERNAME>.github.io/neon-grid-hacker/",
    ```
    Replace `<YOUR_USERNAME>` with your GitHub username.

2.  **Install the `gh-pages` package:**
    ```sh
    npm install --save-dev gh-pages
    ```
    Or with Bun:
    ```sh
    bun add --dev gh-pages
    ```

3.  **Add deploy scripts to `package.json`:**
    Add the following scripts to your `package.json`:
    ```json
    "scripts": {
      // ... existing scripts
      "predeploy": "npm run build",
      "deploy": "gh-pages -d dist"
    }
    ```
    If using Bun, you might adapt these scripts or use Bun's equivalent commands for building.

4.  **Deploy:**
    Run the deploy script:
    ```sh
    npm run deploy
    ```
    Or with Bun (after adapting scripts):
    ```sh
    bun run deploy 
    ```

5.  **Configure GitHub Pages:**
    In your GitHub repository settings, under "Pages", ensure the source is set to deploy from the `gh-pages` branch (or the branch `gh-pages` pushes to, usually `gh-pages`).

Once this setup is complete, every push to `main` triggers the included GitHub Actions workflow which builds and publishes your site automatically.

