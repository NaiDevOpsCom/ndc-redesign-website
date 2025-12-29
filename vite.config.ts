import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  // Hardening: Apply to staging/production branches OR if running locally in production mode w/o branch info
  // This allows `npm run build:prod` locally to produce a hardened build even if env vars are missing
  const branch = process.env.GITHUB_REF_NAME || process.env.VERCEL_GIT_COMMIT_REF || "";

  const isHardenedBranch = ["production", "staging"].includes(branch);
  const isHardenedMode = ["production", "staging"].includes(mode);

  // If we have explicit branch info, trust it (must be on prod/staging branch AND mode).
  // If we DO NOT have branch info (local), fall back to mode check.
  const hasBranchInfo = !!branch;
  const isHardened = hasBranchInfo ? (isHardenedBranch && isHardenedMode) : isHardenedMode;

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
