import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import javascriptObfuscator from "vite-plugin-javascript-obfuscator";
import removeConsole from "vite-plugin-remove-console";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig(({ mode }) => ({
    plugins: [
        react(),

        // Remove console/debug in production
        mode === "production" && removeConsole(),

        // JS Obfuscation in production
        mode === "production" &&
        javascriptObfuscator({
            compact: true,
            controlFlowFlattening: true,
            deadCodeInjection: true,
            disableConsoleOutput: true,
            stringArray: true,
            stringArrayShuffle: true,
            stringArrayThreshold: 0.75,
            simplify: true,
        }),

        // Optional: visualize bundle
        mode === "production" &&
        visualizer({
            filename: "./dist/bundle-analysis.html",
            open: false,
            gzipSize: true,
            brotliSize: true,
        }),
    ],

    // -----------------------------
    // Aliases
    // -----------------------------
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "client/src"),
            "@shared": path.resolve(__dirname, "shared"),
            "@assets": path.resolve(__dirname, "attached_assets"),
        },
    },

    root: path.resolve(__dirname, "client"),

    build: {
        outDir: path.resolve(__dirname, "dist"),
        emptyOutDir: true,
        minify: "terser",
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
                passes: 3,
            },
            mangle: {
                toplevel: true,
            },
        },
    },

    server: {
        fs: {
            strict: true,
            deny: ["**/.*"],
        },
    },

    // Disable React DevTools in production
    define: {
        __DISABLE_REACT_DEVTOOLS__: mode === "production",
    },
}));
