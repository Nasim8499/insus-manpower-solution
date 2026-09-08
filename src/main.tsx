import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

/* Register PWA service worker (production only) */
if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    const register = (url: string) =>
      navigator.serviceWorker.register(url).catch(() => {
        /* offline / file:// environments — app still works without SW */
      });
    // Relative path first (works under root or subpath), absolute fallback.
    register("sw.js").catch(() =>
      register(`${import.meta.env.BASE_URL}sw.js`)
    );
  });
}
