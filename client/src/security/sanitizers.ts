/**
 * Sanitizes text inputs to reduce XSS vectors
 */
export function sanitizeInput(value: string): string {
    return value
        .replace(/<script.*?>.*?<\/script>/gi, "")
        .replace(/javascript:/gi, "")
        .replace(/<.*?on\w+=.*?>/gi, "")
        .replace(/<\/?[^>]+(>|$)/g, "") // remove HTML tags
        .trim();
}

/**
 * Sanitize data before sending to backend
 */
export function sanitizeObject<T extends object>(obj: T): T {
    const clone: any = {};

    for (const key in obj) {
        const value = (obj as any)[key];

        clone[key] =
            typeof value === "string"
                ? sanitizeInput(value)
                : typeof value === "object" && value !== null
                    ? sanitizeObject(value)
                    : value;
    }

    return clone;
}
