import js from '@eslint/js';
import prettierPlugin from 'eslint-plugin-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

console.log(import.meta.dirname);

export default defineConfig([
    globalIgnores(['dist']),
    {
        files: ['**/*.{ts,tsx}'],
        extends: [
            js.configs.recommended,
            reactHooks.configs['recommended-latest'],
            reactRefresh.configs.vite,
            tseslint.configs.recommendedTypeChecked,
            tseslint.configs.strictTypeChecked,
            tseslint.configs.stylisticTypeChecked,
        ],
        plugins: {
            prettier: prettierPlugin,
        },
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parserOptions: {
                project: ['./tsconfig.node.json', './tsconfig.app.json'],
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            '@typescript-eslint/no-non-null-assertion': ['off'],
        },
    },
]);
