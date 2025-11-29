import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// ✅ Import the advanced security middleware

import { enableAdvancedSecurity } from "@/security/securityMiddleware.ts"
// 🔐 Run all frontend security features in production
if (import.meta.env.PROD) {
    enableAdvancedSecurity();
}

createRoot(document.getElementById("root")!).render(<App />);
