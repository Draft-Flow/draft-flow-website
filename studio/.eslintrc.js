module.exports = {
  ignorePatterns: ['node_modules', 'dist'],
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base', '@sanity/eslint-config-studio', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    semi: [2, 'never'],
  },
}
