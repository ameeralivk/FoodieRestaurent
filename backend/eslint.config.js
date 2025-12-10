// eslint.config.js
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import globals from "globals";

export default [
  {
    ignores: ["dist/**"], // dont lint compiled files
  },

  {
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        ...globals.node,  // ⬅ FIXES process, console, __dirname errors!
      },
    },

    plugins: {
      "@typescript-eslint": tseslint,
    },

    rules: {
      // ---------- Common Fixes ----------
      "no-undef": "off", // TS already handles this

      // Allow console in backend
      "no-console": "off",

      // TypeScript rules
      "@typescript-eslint/no-unused-vars": ["warn"],
      "@typescript-eslint/no-explicit-any": "off", // if you want to disable
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-wrapper-object-types": "off",
      "@typescript-eslint/no-unsafe-function-type": "off",

      // Optional strictness
      // "@typescript-eslint/no-explicit-any": "error",
    },
  },
];
