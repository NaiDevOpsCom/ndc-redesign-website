import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import javascriptObfuscator from "vite-plugin-javascript-obfuscator";
import removeConsole from "vite-plugin-remove-console";
import { visualizer } from "rollup-plugin-visualizer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => ({
    root: path.resolve(__dirname, "client"),

    plugins: [
        react(),

        mode === "production" && removeConsole(),

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

        mode === "production" &&
        visualizer({
            filename: "./dist/bundle-analysis.html",
            open: false,
            gzipSize: true,
            brotliSize: true,
        }),
    ],

    resolve: {
        alias: {
            "@": path.resolve(__dirname, "client/src"),
        },
    },

    build: {
        outDir: "dist", // outputs to client/dist
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

    define: {
        __DISABLE_REACT_DEVTOOLS__: mode === "production",
    },
}));
