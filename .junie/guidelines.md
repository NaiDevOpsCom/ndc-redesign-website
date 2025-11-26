Project development guidelines

This document captures practical, project‑specific notes for developing, building, and testing the Nairobi DevOps (React + Vite + TypeScript) codebase. It assumes familiarity with Node.js, React, Vite, TypeScript, Tailwind CSS, and ESLint.

1. Build and configuration

- Tooling overview
  - Runtime: Node 18+ recommended.
  - Bundler/dev server: Vite 7 (React plugin).
  - Language: TypeScript (strict, noEmit), React 18.
  - Styling: TailwindCSS 3 with @tailwindcss/typography.
  - Linting: ESLint flat config with React, Hooks, Security, and TypeScript plugins.

- Project layout
  - App root for Vite is client/ (configured via vite.config.ts: root = client).
  - Build output is dist/ at repository root (configured via vite.config.ts: build.outDir = dist).
  - Path aliases (Vite + TS):
    - @ → client/src
    - @shared → shared
    - @assets → attached_assets
    These are defined in both vite.config.ts (for runtime/build) and tsconfig.json (for type‑checking). If you add a new alias, update both files.

- Install and run
  - Install dependencies: npm ci (or npm install for local iteration).
  - Start dev server: npm run dev (serves client/ with Vite).
  - Production build: npm run build (outputs to dist/).
  - Preview built app locally: npm run preview.

- TypeScript configuration
  - Strict mode is enabled. New TS code should compile without suppressions.
  - jsx: react-jsx is configured; no React import is required in TSX files.
  - allowImportingTsExtensions is enabled. If you use TS extension imports (e.g., import x from "./file.ts"), ensure Vite can also resolve them.
  - The compiler is noEmit; type‑checks happen during tooling runs (Vite/esbuild and editor tsserver).

- ESLint
  - Primary entry: eslint.config.js (flat config, ESM).
  - Useful scripts:
    - npm run lint — lints the project (root), auto‑fix where possible.
    - npm run lint:fix — forces TS/TSX ext resolution and applies fixes.
  - Selected project rules:
    - react/react-in-jsx-scope off; prop-types off (TypeScript preferred).
    - @typescript-eslint/no-unused-vars warns; ignore patterns for _args/_vars are allowed.
    - security/detect-object-injection is disabled due to common React prop/object usage.

2. Testing information

This repository does not include a full test framework (e.g., Vitest/Jest) by default. For quick smoke tests and examples, we use tsx to run TypeScript directly under Node.

- One‑off smoke test (no repo changes required)
  - From the repository root, you can execute small TypeScript scripts on demand using npx tsx. Example:
    1) Create a temporary file tests/smoke.test.ts with content similar to the snippet below.
    2) Run: npx tsx tests/smoke.test.ts
    3) Remove the temporary file when done.

  Example content that imports a real project module and asserts behavior:

  // File: tests/smoke.test.ts
  import assert from "node:assert";
  // Use a relative import to avoid alias resolution in Node context
  import { cn } from "../../client/src/lib/utils.ts";

  const out = cn("px-2", false && "hidden", "text-sm", ["px-2", "text-sm"], null);
  // Tailwind merge should dedupe px-2 and text-sm
  assert.equal(out, "px-2 text-sm");
  console.log("Smoke test passed: cn() outputs:", JSON.stringify(out));

  - Notes:
    - We purposely avoid @ alias at runtime for Node scripts; path aliases are resolved by Vite during app execution, not by Node. For tests run via Node, prefer relative imports or introduce tsconfig‑paths if needed.
    - The repository’s tsconfig.json allows importing .ts extensions; the sample leverages that to run under tsx without extra config.

- Adding a proper test harness (optional)
  If the project requires a persistent test suite:
  - Recommend Vitest (works seamlessly with Vite). Minimal steps:
    - npm i -D vitest @vitest/ui @testing-library/react @testing-library/jest-dom jsdom
    - Add "test": "vitest" and optionally "test:ui": "vitest --ui" to package.json.
    - Create vitest.config.ts that extends Vite config and sets test.environment = "jsdom"; include alias resolution via Vite.
    - Add a sample test in client/src/__tests__/ e.g., utils.test.ts that imports from @/lib/utils and uses expect from Vitest.
  - Keep test files out of production builds by placing them under __tests__ or using *.test.ts(x) patterns ignored by tsconfig exclude.

3. Additional development notes

- Routing and app root
  - Vite root is client/; ensure all asset and public paths are resolved relative to that root. The dist/ is emitted to the repository root by configuration.

- Aliases and imports
  - Use @ for importing from client/src in application code. Do not use @ in Node scripts unless you set up runtime alias resolution (tsconfig‑paths or Vitest).
  - When moving modules across folders, update both tsconfig.json paths and vite.config.ts aliases if you change alias targets.

- CSS and Tailwind
  - Tailwind is configured via tailwind.config.ts and postcss.config.js. Prefer class composition via the cn helper in client/src/lib/utils.ts. Avoid bespoke string concatenation that defeats Tailwind’s merge behavior.

- Linting and quality
  - Run npm run lint before committing. Address warnings where practical; do not broadly disable rules without justification.

- Accessibility and icons
  - lucide-react is used extensively; ensure icons have aria-hidden when decorative and provide labels when interactive.

- Performance
  - Vite code‑splitting is automatic. Prefer dynamic imports for route‑level components if they grow large. Keep image assets optimized; when adding background galleries, provide thumbnails and lazy loading as done in existing components.

- Debugging tips
  - For dev server SSR issues or path errors, confirm import.meta.dirname usage in vite.config.ts is correct on your platform. This project uses ESM everywhere; avoid CommonJS interop unless necessary.
  - If aliases act inconsistently between IDE and runtime, ensure both tsconfig.json and vite.config.ts are aligned and the IDE uses the workspace TypeScript version (5.6.x).

- CI/CD and environments
  - The project includes vercel.json for deployment previews. Ensure environment variables (if introduced) are prefixed with VITE_ and consumed via import.meta.env in client code.

Change control

- Keep changes minimal and aligned with existing patterns. If introducing testing infra, prefer Vitest to match the Vite ecosystem.
