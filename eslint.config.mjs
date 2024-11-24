import globals from "globals";
import pluginJs from "@eslint/js";
import tseslintPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettierPlugin from "eslint-plugin-prettier";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      "@typescript-eslint": tseslintPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      "no-unused-vars": "error",
      "no-unused-expressions": "error",
      "prefer-const": "error",
      "no-console": "warn",
      "no-undef": "error",
      "no-var": "error",
      "@typescript-eslint/no-unused-vars": "error",
      "prettier/prettier": "error",
    },
    ignores: ["node_modules/**", "dist/**"],
  },
  {
    files: ["**/*.js", "**/*.ts"],
    rules: {
      // Include rules from eslint:recommended and plugin:@typescript-eslint/recommended
      ...pluginJs.configs.recommended.rules,
      ...tseslintPlugin.configs.recommended.rules,
    },
  },
];
