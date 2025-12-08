// eslint.config.js
import js from '@eslint/js'
import tsparser from '@typescript-eslint/parser'
import tsplugin from '@typescript-eslint/eslint-plugin'

export default [
  js.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      '@typescript-eslint': tsplugin
    },
    rules: {
      ...tsplugin.configs.recommended.rules,
      'indent': ['error', 2],
      'semi': ['error', 'never'],
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'no-undef': 'off'
    }
  }
]