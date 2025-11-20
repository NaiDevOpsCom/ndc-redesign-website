// ESLint flat config for React + TypeScript + Vite
import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import security from "eslint-plugin-security";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: [
      "node_modules",
      "dist",
      "build",
      "coverage",
      "**/.vite",
      "**/dist",
      "**/build",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}", "**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      react,
      "react-hooks": reactHooks,
      security,
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      // React 17+ with automatic JSX runtime
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      // We don't use prop-types with TS
      "react/prop-types": "off",
      // Common quality knobs
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
      ],
      // This rule is noisy for typical React data access patterns
      "security/detect-object-injection": "off",
    },
  },
];
