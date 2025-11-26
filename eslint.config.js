import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import securityPlugin from "eslint-plugin-security";
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

    // 2. Base JS rules
    js.configs.recommended,

    // 3. TypeScript rules
    {
        plugins: { "@typescript-eslint": tsPlugin },
        rules: tsPlugin.configs.recommended.rules,
    },

    // 4. React recommended rules
    {
        plugins: { react: reactPlugin },
        rules: reactPlugin.configs.flat.recommended.rules,
    },

    // 5. React Hooks
    {
        plugins: { "react-hooks": reactHooksPlugin },
        rules: reactHooksPlugin.configs.recommended.rules,
    },

    // 6. Security plugin
    {
        plugins: { security: securityPlugin },
        rules: securityPlugin.configs.recommended.rules,
    },

    // 7. Project-specific overrides for TS/React
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
            globals: globals.browser,  // Add browser globals like window here
        },
        settings: { react: { version: "detect" } },
        rules: {
            "react/react-in-jsx-scope": "off",
            "react/jsx-uses-react": "off",
            "react/prop-types": "off",
            "@typescript-eslint/no-unused-vars": [
                "warn",
                { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
            ],
            "security/detect-object-injection": "off"
        }
    }
];
