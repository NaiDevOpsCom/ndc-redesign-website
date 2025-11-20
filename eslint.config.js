// ESLint Flat Config for React + TypeScript + Vite

import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import security from "eslint-plugin-security";
import tseslint from "typescript-eslint";

export default [
  // 1. Ignored files
  {
    ignores: [
      "node_modules",
      "dist",
      "build",
      "coverage",
      "**/.vite",
    ],
  },

  // 2. Base JS rules
  js.configs.recommended,

  // 3. TypeScript recommended sets (strict mode included)
  ...tseslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylistic,

  // 4. React recommended presets
  react.configs.flat.recommended,
  react.configs.flat["jsx-runtime"],

  // 5. React Hooks recommended preset
  {
    plugins: { "react-hooks": reactHooks },
    rules: reactHooks.configs.recommended.rules,
  },

  // 6. Security recommended
  security.configs.recommended,

  // 7. Custom project rules
  {
    files: ["**/*.{ts,tsx}"],

    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
        projectService: true,
      },
    },

    settings: { react: { version: "detect" } },

    rules: {
      // React 17+ JSX automatic runtime
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",

      // Disable prop-types for TS
      "react/prop-types": "off",

      // Improve unused variable handling
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],

      // Disabled due to React object access patterns
      "security/detect-object-injection": "off",
    },
  },
];
