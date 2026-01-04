import { createRoot } from "react-dom/client";

import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";
import "./index.css";

/**
 * Application entry point.
 *
 * SECURITY: The ErrorBoundary wraps the entire application to:
 * - Catch unhandled JavaScript errors in any component
 * - Display a user-friendly fallback instead of a blank screen
 * - Prevent internal error details from leaking to users in production
 *
 * @see client/src/components/ErrorBoundary.tsx
 */
createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
