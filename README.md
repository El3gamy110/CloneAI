# 🌌 CloneAI

CloneAI is a premium, client-side ChatGPT clone UI built with **React**, **Vite**, and **Tailwind CSS v4**. It is powered directly in the browser by the ultra-fast **Groq API** utilizing the `llama-3.1-8b-instant` model.

The interface is styled with a custom space-teal dark theme, featuring smooth animations, premium glassmorphism layouts, and a secure local credentials manager.

---

## ✨ Key Features

*   **⚡ Groq Llama-3.1 Integration**: Connects to Groq's completions endpoint using the `llama-3.1-8b-instant` model for near-instantaneous AI responses.
*   **🎨 Tailwind CSS v4 Engine**: Refactored entirely with Tailwind CSS v4, using CSS-first configuration (`@theme`) to customize colors, fonts, and micro-animations.
*   **🔒 Secure Client-Side Credentials**: No backend server required. Prompts users for their own Groq API key on load if none is found in the environment. Keys are stored securely in browser `localStorage`.
*   **💎 Premium UI Elements**:
    *   **Settings Modal**: Easy API key setup and update option directly in the sidebar.
    *   **Pro Upgrade Modal**: Sleek mock modal outlining features and premium subscription details.
    *   **Toast Alerts**: Smooth custom glassmorphism notification banners (`@keyframes slideDownFadeIn`) to replace unstyled browser alert boxes.
    *   **Pulsing Typing Indicator**: A beautiful mint-teal thinking loader when the AI completes requests.
    *   **Interactive Sidebar**: Clickable query history templates and action buttons.
*   **🚀 Continuous Deployment**: Fully automated GitHub Actions pipeline (`deploy.yml`) to compile and publish to GitHub Pages on every push to `main`.

---

## 🛠️ Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18+) and `npm` installed.

### 1. Installation
Clone the repository and install the dependencies:
```bash
git clone https://github.com/El3gamy110/CloneAI.git
cd CloneAI
npm install
```

### 2. Configure Local Environment
Create a `.env` file in the root folder of the project to configure your API key for local development:
```env
VITE_GROQ_API_KEY=your_groq_api_key_here
```
> ⚠️ **Note**: The `.env` file is excluded from git tracking via `.gitignore` to prevent leaking your private key on GitHub.

### 3. Run Development Server
Start the local development server:
```bash
npm run dev
```
Open **`http://localhost:5173`** in your browser to view the application.

---

## 🚀 Deployment to GitHub Pages

CloneAI is configured to build and deploy automatically using **GitHub Actions**.

### Enabling Automatic Builds

1.  Push the project code to your GitHub repository.
2.  Go to your repository settings page: `https://github.com/your-username/CloneAI/settings/pages`
3.  Under **Build and deployment** > **Source**:
    *   Change the source from **Deploy from a branch** to **GitHub Actions**.
4.  GitHub will run the workflow file [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) automatically.
5.  Your site will be live at: `https://your-username.github.io/CloneAI/`

---

## 📦 Project Structure

```text
├── .github/workflows/
│   └── deploy.yml          # GitHub Actions deployment workflow
├── public/
│   ├── favicon.png         # Logo favicon
│   └── icons.svg           # Inline icons
├── src/
│   ├── assets/             # Images and design assets
│   ├── Components/
│   │   ├── Chat.jsx        # Conversational UI & dynamic client instantiation
│   │   └── sidebar.jsx     # Sidebar menus, bookmarks, settings links
│   ├── App.css             # Tailwind v4 directives & custom CSS scrollbars
│   ├── App.jsx             # Main layout, alert toasts, and modal states
│   └── main.jsx            # React root mount loader
├── vite.config.js          # Vite config with Tailwind CSS v4 compiler integration
└── package.json            # Scripts & project dependencies
```
