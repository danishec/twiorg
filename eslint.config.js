import js from '@eslint/js';
import jsonPlugin from 'eslint-plugin-jsonc';
import globals from 'globals';

export default [
  js.configs.recommended, // Start with ESLint's recommended rules for JavaScript
  {
    files: ['**/*.js'], // Specific configuration for JavaScript files
    languageOptions: {
      globals: {
        ...globals.browser, // Common browser globals (window, document, etc.)
        ...globals.node,   // Common Node.js globals (module, process, etc.)
        ...globals.es2021, // Globals introduced in ECMAScript 2021
      },
      sourceType: 'module', // Assumes you are working with ES Modules
      ecmaVersion: 'latest', // Enable parsing of newest ECMAScript features
    },
    rules: {
      // Add any JavaScript-specific rules or overrides here
      'no-unused-vars': 'warn', // Example: Warn instead of error for unused variables
    },
  },
  {
    files: ['**/*.json', '**/*.jsonc'], // Specific configuration for JSON and JSONC files
    plugins: {
      jsonc: jsonPlugin, // Use the eslint-plugin-jsonc for JSON handling
    },
    languageOptions: {
      parser: jsonPlugin.parser, // Use the parser from eslint-plugin-jsonc
    },
    rules: {
      ...jsonPlugin.configs['recommended-with-jsonc'].rules, // Include recommended rules for JSONC
      // You can add or override JSON rules here if needed
      'jsonc/no-dupe-keys': 'error',
    },
  },
  {
    ignores: ['node_modules/', 'dist/', 'build/', '.cache/'] // Ignore common build directories and dependencies
  }
];
