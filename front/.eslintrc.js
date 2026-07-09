module.exports = {
  parser: "@typescript-eslint/parser",
  ignorePatterns: ["dist"],
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
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {},
};
