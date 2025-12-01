import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";


import { enableAdvancedSecurity } from "@/security/securityMiddleware.ts"
if (import.meta.env.PROD) {
    enableAdvancedSecurity();
}

createRoot(document.getElementById("root")!).render(<App />);
