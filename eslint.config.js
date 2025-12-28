import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import securityPlugin from "eslint-plugin-security";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import promisePlugin from "eslint-plugin-promise";
import importPlugin from "eslint-plugin-import";
import prettierConfig from "eslint-config-prettier";
import globals from "globals";
import { fileURLToPath } from "node:url";
import path from "node:path";

// Recreate __dirname for ESM context
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default [
  // 1. Ignore generated files
  {
    ignores: ["node_modules", "dist", "build", "coverage", "**/.vite"],
  },

  // 2. Tell ESLint what files to lint (Flat Config REQUIRED)
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
  },

  // 3. Base JS rules
  js.configs.recommended,

  // 4. TypeScript rules
  {
    plugins: { "@typescript-eslint": tsPlugin },
    rules: {
      ...tsPlugin.configs.recommended.rules,
    },
  },

  // 5. React recommended rules
  {
    plugins: { react: reactPlugin },
    rules: reactPlugin.configs.flat.recommended.rules,
  },

  // 6. React Hooks
  {
    plugins: { "react-hooks": reactHooksPlugin },
    rules: reactHooksPlugin.configs.recommended.rules,
  },

  // 7. Security plugin
  ...securityPlugin.configs.recommended,

  // 8. JSX A11y
  {
    plugins: { "jsx-a11y": jsxA11yPlugin },
    rules: jsxA11yPlugin.configs.recommended.rules,
  },

  // 9. Promise plugin
  {
    plugins: { promise: promisePlugin },
    rules: promisePlugin.configs.recommended.rules,
  },

  // 10. Import plugin
  {
    plugins: { import: importPlugin },
    rules: {
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          "newlines-between": "always",
        },
      ],
    },
  },

  // 11. TS/React project-specific overrides
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ["./tsconfig.json"],
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      globals: globals.browser,
    },
    settings: { react: { version: "detect" } },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react/prop-types": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "security/detect-object-injection": "off",
    },
  },

  // 12. Prettier config (must be last to disable conflicting formatting rules)
  prettierConfig,
];
