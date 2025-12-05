Extension Type: A simple popup extension (browser action) that opens a popup window when the user clicks the extension icon. The popup should display a retro-themed interface, such as a welcome message like "Retro Extension Activated!" with some interactive elements (e.g., a button that toggles text color).
Build Tools: Use Vite as the bundler for fast development and production builds. Include necessary configurations for TypeScript, React, and bundling into a format suitable for browser extensions (e.g., manifest.json, bundled JS/CSS).
Manifest: Use Manifest V3 for compatibility with both Chrome and Firefox. Include permissions like "activeTab" if needed for basic functionality.
UI Design:
    Retro aesthetic: Background black (#000000), text and accents in white (#FFFFFF), highlights in yellow (#FFFFF08).
    Fonts: Use a monospace font like VT323 (import from Google Fonts or include locally). Apply it globally to body and elements for a retro terminal feel.
    Layout: Clean, grid-based or flexbox structure with pixelated or sharp edges to enhance retro vibe.
Popup Size: Set the popup dimensions to exactly 450px width and 900px height via the manifest.json (browser_action or action > default_popup, and ensure CSS enforces these sizes).
Structure:
    Folders: src/ (for TypeScript/React code), public/ (for manifest.json, icons), build/ (output).
    Entry: index.tsx for React root.
    Include a basic component (App.tsx) with styled elements.
    Use CSS-in-JS (like styled-components) or plain CSS modules for styling, ensuring retro styles are applied.
Cross-Browser Compatibility: Ensure it loads correctly on both browsers. Provide instructions for loading unpacked in Chrome/Firefox dev mode, and building for submission (zip the dist folder).
Icons: Include placeholder icons (16x16, 48x48, 128x128 px) in a retro style (e.g., yellow pixel art on black).
Development Setup: Provide a package.json with dependencies (react, react-dom, @types/react, typescript, vite, @vitejs/plugin-react, etc.). Include scripts for dev (vite), build (vite build), and linting.
Additional Features: Add basic state management with useState (e.g., toggle a retro "loading" animation). Make it responsive within the fixed popup size.
Output: Provide the full code for all files (manifest.json, tsconfig.json, vite.config.ts, src/App.tsx, src/index.tsx, src/styles.css or equivalent, etc.). Include step-by-step instructions to set up, run, build, and publish to Chrome Web Store and Firefox Add-ons. Ensure no external dependencies beyond npm installs.