module.exports = {
  parserOptions: {
    ecmaVersion: 6,
  },
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb-base',
  ],
  rules: {
    indent: [
      "error",
      2,
    ],
    "linebreak-style": [
      "error",
      "unix",
    ],
    quotes: [
      "error",
      "single",
    ],
    semi: [
      "error",
      "always",
    ]
  }
};
