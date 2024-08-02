import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["*.ts", "*.js"],
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:@angular-eslint/recommended",
      "plugin:@angular-eslint/template/process-inline-templates",
      "prettier"
    ],
    env: {
      "node": true,
      "es6": true
    },
    rules: {
      "comma-dangle": ["error", "always-multiline"],
      "comma-spacing": "error",
      "comma-style": "error",
      "curly": ["error", "multi-line", "consistent"],
      "dot-location": ["error", "property"],
      "handle-callback-err": "off",
      "indent": ["error", "tab"],
      "keyword-spacing": "error",
      "max-nested-callbacks": ["error", { "max": 4 }],
      "max-statements-per-line": ["error", { "max": 2 }],
      "no-console": "off",
      "no-empty-function": "error",
      "no-floating-decimal": "error",
      "no-inline-comments": "error",
      "no-lonely-if": "error",
      "no-multi-spaces": "error",
      "no-multiple-empty-lines": ["error", { "max": 2, "maxEOF": 1, "maxBOF": 0 }],
      "no-shadow": ["error", { "allow": ["err", "resolve", "reject"] }],
      "no-trailing-spaces": ["error"],
      "no-var": "error",
      "object-curly-spacing": ["error", "always"],
      "prefer-const": "error",
      "space-in-parens": "error",
      "space-infix-ops": "error",
      "space-unary-ops": "error",
      "spaced-comment": "error",
      "semi": ["error", "always"],
      "space-before-blocks": "error",
      "space-before-function-paren": ["error", {
        "anonymous": "never",
        "named": "never",
        "asyncArrow": "always"
      }],
      "@typescript-eslint/no-unused-vars": "warn",
      "@angular-eslint/directive-selector": [
        "error",
        {
          "type": "attribute",
          "prefix": "app",
          "style": "camelCase"
        }
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          "type": "element",
          "prefix": "app",
          "style": "kebab-case"
        }
      ]
    }
  },
  {
    files: ["*.html"],
    extends: [
      "plugin:@angular-eslint/template/recommended",
      "plugin:@angular-eslint/template/accessibility",
      "prettier"
    ],
    "rules": {
      "@angular-eslint/template/click-events-have-key-events": "off",
      "@angular-eslint/template/interactive-supports-focus": "off",
      "@angular-eslint/template/label-has-associated-control": "off",
      "@angular-eslint/template/alt-text": "off"
    }
  }
];
