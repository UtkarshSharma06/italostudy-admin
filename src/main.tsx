import { createRoot } from "react-dom/client";
import { HelmetProvider } from 'react-helmet-async';
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
    <HelmetProvider>
        <App />
    </HelmetProvider>
);

// Remove the inline pre-JS skeleton after React's first paint.
// Double-rAF ensures the skeleton is removed AFTER React has committed
// its first frame to the screen — seamless handoff, no white flash.
const removePreSkeleton = () => {
    const sk = document.getElementById('app-sk');
    if (!sk) return;
    sk.classList.add('sk-out');
    setTimeout(() => {
        sk.remove();
        // Force unlock body scroll in case any logic locked it during boot
        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';
    }, 200);
};
requestAnimationFrame(() => requestAnimationFrame(removePreSkeleton));
