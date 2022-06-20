module.exports = {
  ignorePatterns: [
    "node_modules",
    "dist"
  ],
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    '@sanity/eslint-config-studio',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    semi: [0, "never"],
  },
};
