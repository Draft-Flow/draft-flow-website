module.exports = {
  ignorePatterns: ['node_modules', '_site', 'tmp', 'src/static/bundles'],
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    semi: [2, 'never'],
    'consistent-return': [0, 'never'],
    'no-underscore-dangle': [0, 'never'],
    'default-param-last': [0, 'never'],
    'import/no-extraneous-dependencies': [0, {"devDependencies": true}],
  },
}
