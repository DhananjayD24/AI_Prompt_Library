import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { PromptProvider } from "./context/PromptContext.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <ThemeProvider>
        <PromptProvider>
          <App />
          <Toaster position="top-right" toastOptions={{ duration: 3200 }} />
        </PromptProvider>
      </ThemeProvider>
    </HashRouter>
  </StrictMode>,
);
