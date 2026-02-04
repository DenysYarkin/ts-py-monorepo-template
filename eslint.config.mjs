import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  // 1. Files to ignore globally
  {
    ignores: [
      "**/node_modules/**",
      "**/.next/**",
      "**/dist/**",
      "**/venv/**",
      "**/migrations/**",
      "packages/api-types-ts/index.ts",
    ],
  },

  js.configs.recommended,

  ...tseslint.configs.recommended,

  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { varsIgnorePattern: "^_", argsIgnorePattern: "^_" },
      ],
    },
  },
];
