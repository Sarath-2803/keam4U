import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import json from "@eslint/json";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: globals.node,
      sourceType: "module",
    },
  },

  // TypeScript base config (NO custom rules here)
  ...tseslint.configs.recommended,

  // Your custom override layer (IMPORTANT)
  {
    files: ["**/*.{ts,js,mjs}"],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },

  {
    files: ["**/*.json"],
    plugins: { json },
    extends: ["json/recommended"],
  },
]);