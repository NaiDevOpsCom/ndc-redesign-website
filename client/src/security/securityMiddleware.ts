/* =====================================================================================
   ADVANCED FRONTEND SECURITY MIDDLEWARE FOR REACT + VITE
   Works in frontend-only apps (no backend required)
   ===================================================================================== */

export const isClient = typeof window !== "undefined";

/* =====================================================================================
   1. SECURITY EVENT LOGGER (works with your webhook or console)
   ===================================================================================== */
// export const logSecurityEvent = (type: string, data?: any): void => {
//     console.warn(`[SECURITY] ${type}`, data || "");

    export const logSecurityEvent = (type: string, data?: unknown): void => {
        console.warn(`[SECURITY] ${type}`, data || "");

    // OPTIONAL - send logs to webhook (if you have one)
    // fetch("https://your-webhook.com/security", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ type, data, timestamp: Date.now() }),
    // }).catch(() => {});
};

/* =====================================================================================
   2. INPUT SANITIZATION
   ===================================================================================== */
export const sanitizeInput = (value: string): string => {
    if (!value) return "";
    return value
        .replace(/<script.*?>.*?<\/script>/gi, "")
        .replace(/[<>{}]/g, "")
        .trim();
};

/* =====================================================================================
   3. URL VALIDATION / SANITIZATION
   ===================================================================================== */
export const sanitizeURL = (url: string): string => {
    try {
        const clean = new URL(url);
        return clean.href;
    } catch {
        logSecurityEvent("Blocked malicious URL", url);
        return "/";
    }
};

/* =====================================================================================
   4. SAFE QUERY PARAM SANITIZER
   ===================================================================================== */
export const safeQueryParam = (param: string | null): string => {
    if (!param) return "";
    return sanitizeInput(param);

};

/* =====================================================================================
   5. CSP META INJECTION (Prevents XSS & malicious scripts)
   ===================================================================================== */
export const injectCSP = (): void => {
    if (!isClient) return;

    const csp = document.createElement("meta");
    csp.httpEquiv = "Content-Security-Policy";

    csp.content = `
    default-src 'self';
    img-src 'self' https: data:;
    script-src 'self';
    style-src 'self' 'unsafe-inline';
    connect-src 'self' https:;
    object-src 'none';
    frame-ancestors 'none';
  `.replace(/\s+/g, " ");

    document.head.appendChild(csp);
};

/* =====================================================================================
   6. CLICKJACKING PROTECTION
   ===================================================================================== */
export const preventIframeEmbedding = (): void => {
    if (!isClient) return;

    if (window.top && window.top !== window.self) {
        logSecurityEvent("Clickjacking attempt blocked");
        window.top.location.href = window.location.href;
    }
};

/* =====================================================================================
   7. DISABLE REACT DEVTOOLS (Hard block)
   ===================================================================================== */
export const disableReactDevTools = (): void => {
    if (!isClient) return;

    const devtoolsHook = (window as unknown as { __REACT_DEVTOOLS_GLOBAL_HOOK__?: Record<string, unknown> })
        .__REACT_DEVTOOLS_GLOBAL_HOOK__;

    if (typeof devtoolsHook === "object") {
        for (const key of Object.keys(devtoolsHook)) {
            devtoolsHook[key] = typeof devtoolsHook[key] === "function"
                ? () => null
                : null;
        }
    }
};

/* =====================================================================================
   8. DETECT DEVTOOLS OPEN (Notifies only)
   ===================================================================================== */
export const detectDevTools = (): void => {
    if (!isClient) return;

    let open = false;
    const threshold = 160;

    setInterval(() => {
        const widthDiff = window.outerWidth - window.innerWidth > threshold;
        const heightDiff = window.outerHeight - window.innerHeight > threshold;

        if (widthDiff || heightDiff) {
            if (!open) {
                open = true;
                logSecurityEvent("DevTools Opened");
            }
        } else {
            if (open) {
                open = false;
                logSecurityEvent("DevTools Closed");
            }
        }
    }, 1000);
};

/* =====================================================================================
   9. DOM TAMPER DETECTION (Detects script/iframe injections)
   ===================================================================================== */
export const enableDOMTamperDetection = (): void => {
    if (!isClient) return;

    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            mutation.addedNodes.forEach((node) => {
                if (node instanceof HTMLElement) {
                    if (["SCRIPT", "IFRAME", "OBJECT"].includes(node.tagName)) {
                        logSecurityEvent("DOM Tamper Detected", { node: node.tagName });
                    }
                }
            });
        }
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
    });
};

/* =====================================================================================
   10. GLOBAL API INTERCEPTOR (Safe fetch wrapper)
   ===================================================================================== */
const ALLOWED_API_DOMAINS = [
    "https://", // allow any https API
    // "https://api.example.com",
    // "https://your-webhook.com",
];

export const enableAPIInterceptor = (): void => {
    if (!isClient) return;

    const originalFetch = window.fetch;

    window.fetch = async (...args: Parameters<typeof fetch>) => {
        const [rawUrl, options] = args;
        const url = rawUrl.toString();

        const sanitizedUrl = sanitizeURL(url);

        const isAllowed = ALLOWED_API_DOMAINS.some(domain =>
            sanitizedUrl.startsWith(domain)
        );

        if (!isAllowed) {
            logSecurityEvent("Blocked External API Request", sanitizedUrl);
            return Promise.reject("Blocked API Call");
        }

        if (options?.body && typeof options.body === "string") {
            options.body = sanitizeInput(options.body);
        }

        return originalFetch(sanitizedUrl, options);
    };
};

/* =====================================================================================
   11. MASTER ENABLE FUNCTION
   Call this in main.tsx (production only)
   ===================================================================================== */
export const enableAdvancedSecurity = (): void => {
    injectCSP();
    preventIframeEmbedding();
    disableReactDevTools();
    detectDevTools();
    enableDOMTamperDetection();
    enableAPIInterceptor();
};
