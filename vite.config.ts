import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  // Hardening: Apply only to staging and production branches
  const branch = process.env.GITHUB_REF_NAME || process.env.VERCEL_GIT_COMMIT_REF || "";
  const isHardenedBranch = ["production", "staging"].includes(branch);
  const isHardenedMode = ["production", "staging"].includes(mode);

  // Only harden if BOTH the mode is production/staging AND the branch is production/staging
  // This ensures no impact on 'main' or other branches even if mode is 'production'
  const isHardened = isHardenedMode && isHardenedBranch;

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "client", "src"),
        "@shared": path.resolve(import.meta.dirname, "shared"),
        "@assets": path.resolve(import.meta.dirname, "attached_assets"),
      },
    },
    root: path.resolve(import.meta.dirname, "client"),
    build: {
      outDir: path.resolve(import.meta.dirname, "dist"),
      emptyOutDir: true,
      // Hardening: Disable source maps in production/staging to prevent source code exposure
      sourcemap: !isHardened,
      // Hardening: Ensure minification is enabled
      minify: "esbuild",
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom", "react-router-dom"],
          },
        },
      },
    },
    // Hardening: Strip console and debugger statements from production/staging builds
    esbuild: {
      drop: isHardened ? ["console", "debugger"] : [],
    },
    server: {
      fs: {
        strict: true,
        deny: ["**/.*"],
      },
      proxy: {
        "/api/luma": {
          target: "https://api.luma.com",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/luma/, ""),
          secure: true,
        },
      },
    },
  };
});
