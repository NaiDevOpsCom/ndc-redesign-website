import path from "path";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const branch =
    process.env.GITHUB_BASE_REF ||
    process.env.GITHUB_REF_NAME ||
    process.env.VERCEL_GIT_COMMIT_REF ||
    "";

  const isHardenedBranch = ["production", "staging", "main", "pre-dev", "pre-staging"].includes(
    branch
  );
  const isHardenedMode = ["production", "staging"].includes(mode);
  const hasBranchInfo = !!branch;
  const isHardened = isHardenedMode && (!hasBranchInfo || isHardenedBranch);

  return {
    plugins: [tailwindcss(), react()],
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
      copyPublicDir: true,
      emptyOutDir: true,
      sourcemap: !isHardened,
      // Use terser for hardened builds (better at removing console)
      minify: isHardened ? "terser" : "esbuild",
      // Terser options for aggressive console/debugger removal
      terserOptions: isHardened
        ? {
            compress: {
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ["console.log", "console.info", "console.debug", "console.warn"],
            },
          }
        : undefined,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom", "react-router-dom"],
          },
        },
        external: [],
      },
    },
    // Keep esbuild drop as double protection
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
