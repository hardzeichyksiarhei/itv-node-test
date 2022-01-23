module.exports = {
  root: true,
  env: {
    es2020: true,
    jasmine: true,
    jest: true,
    node: true,
  },
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    ecmaVersion: 2021,
    ecmaFeatures: {
      impliedStrict: true,
    },
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  settings: {
    noInlineConfig: true,
    node: {
      tryExtensions: ['.js', '.json', '.ts', '.d.ts'],
    },
  },
  ignorePatterns: ['.eslintrc.js'],
  extends: [
    'eslint:recommended',
    'plugin:node/recommended',
    'airbnb-base',
    'airbnb-typescript/base',
    'prettier',
  ],
  rules: {
    'import/extensions': 'off',
    'linebreak-style': 'off',
    'node/no-unsupported-features/es-syntax': 'off',
    'no-underscore-dangle': 'off',
    'import/prefer-default-export': 'off',
  },
};
