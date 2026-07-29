import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { PromptProvider } from "./context/PromptContext.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <PromptProvider>
          <App />
          <Toaster position="top-right" toastOptions={{ duration: 3200 }} />
        </PromptProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
