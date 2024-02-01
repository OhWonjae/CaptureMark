module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  globals: {
    chrome: true,
  },
  extends: ['prettier', 'eslint:recommended', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
};
