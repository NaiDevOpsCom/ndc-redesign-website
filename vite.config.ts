import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import javascriptObfuscator from "vite-plugin-javascript-obfuscator"; // JS Obfuscation plugin
import removeConsole from "vite-plugin-remove-console"; // Remove console plugin
import { visualizer } from "rollup-plugin-visualizer"; // Optional bundle analysis plugin

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),

    // -----------------------------
    // Remove console/debug in production
    // -----------------------------
    mode === "production" && removeConsole(),

    // -----------------------------
    // JS Obfuscation in production
    // -----------------------------
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

    // -----------------------------
    // Optional: visualize bundle
    // -----------------------------
    mode === "production" &&
      visualizer({
        filename: "./dist/bundle-analysis.html",
        open: false, // set true if you want to open automatically after build
        gzipSize: true,
        brotliSize: true,
      }),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"), // ✅ maps @ → client/src
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },

  root: path.resolve(__dirname, "client"),

  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,

    // -----------------------------
    // Max Terser minification
    // -----------------------------
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,    // double safety, remove logs
        drop_debugger: true,   // remove debugger statements
        passes: 3,             // compress multiple times
      },
      mangle: {
        toplevel: true,        // mangle top-level variable names
      },
    },
  },

  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },

  // -----------------------------
  // Global define for disabling React DevTools
  // -----------------------------
  define: {
    __DISABLE_REACT_DEVTOOLS__: mode === "production",
  },
}));
