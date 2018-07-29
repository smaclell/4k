module.exports = {
  parserOptions: {
    ecmaVersion: 2017,
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
  },
  overrides: [
    {
      files: ["**/*.test.js"],
      env: {
        node: true,
        mocha: true,
      },
      globals: {
        expect: true,
      },
      rules: {
      },
    },
  ],
};
