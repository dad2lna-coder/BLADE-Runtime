import js from "@eslint/js";
import globals from "globals";

export default [
  {
    ignores: ["node_modules/**", "lib/**", "**/dist/**", "*.min.js", "dist-frontend/**", "*.log", "*.json"],
  },
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        console: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        DateTime: "readonly",
        luxon: "readonly",
        dayjs: "readonly",
        Sortable: "readonly",
        ExcelJS: "readonly",
        module: "readonly",
        global: "readonly",
        process: "readonly",
        Buffer: "readonly",
        FileReader: "readonly",
        Blob: "readonly",
        HTMLElement: "readonly",
        HTMLButtonElement: "readonly",
        HTMLInputElement: "readonly",
        HTMLSelectElement: "readonly",
        HTMLTableElement: "readonly",
        MouseEvent: "readonly",
        KeyboardEvent: "readonly",
        Event: "readonly",
        File: "readonly",
        Promise: "readonly",
        Map: "readonly",
        Set: "readonly",
        Array: "readonly",
        Object: "readonly",
        Number: "readonly",
        String: "readonly",
        Math: "readonly",
        JSON: "readonly",
        require: "readonly",
      },
    },
    rules: {
      "no-unused-vars": ["warn", { "argsIgnorePattern": "^_", "caughtErrorsIgnorePattern": "^_" }],
      "no-undef": "off",
      "no-empty": ["error", { "allowEmptyCatch": true }],
    },
  },
  {
    files: ["tests/**/*.js", "tests/**/*.mjs"],
    languageOptions: {
      globals: {
        it: "readonly",
        describe: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
      },
    },
  },
];