// Utility: pick N random items from an array without mutating the original (Fisher–Yates)
export function getRandomItems<T>(items: T[], count: number): T[] {
    const arr = items.slice();
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
    }
    return arr.slice(0, count);
}
