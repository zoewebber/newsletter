module.exports = {
  parser: "@typescript-eslint/parser",
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "prettier",
  ],
  rules: {},
};
