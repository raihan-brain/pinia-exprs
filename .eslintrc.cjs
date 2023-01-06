/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  env: {
    node: true,
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: "latest",
    ts: "@typescript-eslint/parser",
  },
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    "no-var": "error",
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/v-slot-style": [
      "error",
      {
        atComponent: "longform",
        default: "longform",
        named: "longform",
      },
    ],
    "prettier/prettier": "error",
    "prefer-const": [
      "error",
      {
        destructuring: "any",
        ignoreReadBeforeAssign: false,
      },
    ],
  },
  ignorePatterns: ["bs23/*"],

  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
};
