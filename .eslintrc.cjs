module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['google', 'prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'html'],
  rules: {
    'require-jsdoc': 'off',
  },
};
