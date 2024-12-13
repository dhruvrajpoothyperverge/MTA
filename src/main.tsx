import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ToastProvider from "./ToastProvider.tsx";
import { SkeletonTheme } from "mta-components";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastProvider />
    <SkeletonTheme baseColor="#3a3a3a" highlightColor="#505050">
      <App />
    </SkeletonTheme>
  </StrictMode>
);
