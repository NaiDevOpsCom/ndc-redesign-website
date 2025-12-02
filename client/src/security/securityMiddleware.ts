/* =====================================================================================
   ADVANCED FRONTEND SECURITY MIDDLEWARE FOR REACT + VITE (CSP REMOVED)
   Safe for Vercel deployment
   ===================================================================================== */

export const isClient = typeof window !== "undefined";

/* =====================================================================================
   1. SECURITY EVENT LOGGER
   ===================================================================================== */
export const logSecurityEvent = (type: string, data?: unknown): void => {
    console.warn(`[SECURITY] ${type}`, data || "");
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
   5. (REPLACED) – SAFE META TAG INJECTION (Non-CSP, Safe for Vercel)
   ===================================================================================== */
export const injectSecurityMeta = (): void => {
    if (!isClient) return;

    // This is NOT CSP — it’s harmless and safe for Vercel.
    const meta = document.createElement("meta");
    meta.name = "referrer";
    meta.content = "strict-origin-when-cross-origin";

    document.head.appendChild(meta);
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

    const devtoolsHook =
        (window as unknown as { __REACT_DEVTOOLS_GLOBAL_HOOK__?: Record<string, unknown> })
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
   8. DETECT DEVTOOLS OPEN (Notification only)
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
   9. DOM TAMPER DETECTION (Detect script/iframe injections)
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
   10. GLOBAL API INTERCEPTOR
   ===================================================================================== */
const ALLOWED_API_DOMAINS = [
    "https://", // allow any https API
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
   11. MASTER ENABLE FUNCTION (CSP Removed)
   ===================================================================================== */
export const enableAdvancedSecurity = (): void => {
    injectSecurityMeta();     // <-- replaces CSP injection
    preventIframeEmbedding();
    disableReactDevTools();
    detectDevTools();
    enableDOMTamperDetection();
    enableAPIInterceptor();
};
