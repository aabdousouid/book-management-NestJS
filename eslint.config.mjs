// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'], // Ignore specific files
  },
  eslint.configs.recommended, // ESLint recommended rules
  ...tseslint.configs.recommendedTypeChecked, // TypeScript recommended rules
  eslintPluginPrettierRecommended, // Prettier recommended rules
  {
    languageOptions: {
      globals: {
        ...globals.node, // Node.js global variables
        ...globals.jest, // Jest global variables
      },
      ecmaVersion: 'latest', // Use the latest ECMAScript version
      sourceType: 'module', // Use ES modules
      parserOptions: {
        project: true, // Enable TypeScript project support
        tsconfigRootDir: __dirname, // Use the current directory as the root
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off', // Allow `any` type
      '@typescript-eslint/no-floating-promises': 'warn', // Warn about unhandled promises
      '@typescript-eslint/no-unsafe-argument': 'warn', // Warn about unsafe arguments
    },
  },
);