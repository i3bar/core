const INDENTATION_SPACES_COUNT = 2;
const PARSER_ECMASCRIPT_VERSION = 2018;

module.exports = {
  "env": {
    "es6": true,
    "node": true
  },
  "extends": "eslint:recommended",
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": PARSER_ECMASCRIPT_VERSION,
    "sourceType": "module"
  },
  "rules": {
    "indent": [
      "error",
      INDENTATION_SPACES_COUNT
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "double"
    ],
    "semi": [
      "error",
      "always"
    ],
    "for-direction": [
      "error"
    ],
    "getter-return": [
      "error",
      {
        "allowImplicit": false
      }
    ],
    "no-async-promise-executor": [
      "error"
    ],
    "no-await-in-loop": [
      "error"
    ],
    "no-compare-neg-zero": [
      "error"
    ],
    "no-cond-assign": [
      "error",
      "always"
    ],
    "no-console": [
      "error",
    ],
    "no-constant-condition": [
      "error",
      {
        "checkLoops": false
      }
    ],
    "no-control-regex": [
      "error"
    ],
    "no-debugger": [
      "error"
    ],
    "no-dupe-args": [
      "error"
    ],
    "no-dupe-keys": [
      "error"
    ],
    "no-duplicate-case": [
      "error"
    ],
    "no-empty": [
      "error"
    ],
    "no-empty-character-class": [
      "error"
    ],
    "no-ex-assign": [
      "error"
    ],
    "no-extra-boolean-cast": [
      "error"
    ],
    "no-extra-parens": [
      "error"
    ],
    "no-extra-semi": [
      "error"
    ],
    "no-func-assign": [
      "error"
    ],
    "no-inner-declarations": [
      "error",
      "both"
    ],
    "no-invalid-regexp": [
      "error"
    ],
    "no-irregular-whitespace": [
      "error",
      {
        "skipStrings": false,
        "skipComments": false,
        "skipRegExps": false,
        "skipTemplates": false
      }
    ],
    "no-misleading-character-class": [
      "error"
    ],
    "no-obj-calls": [
      "error"
    ],
    "no-prototype-builtins": [
      "error"
    ],
    "no-regex-spaces": [
      "error"
    ],
    "no-sparse-arrays": [
      "error"
    ],
    "no-template-curly-in-string": [
      "error"
    ],
    "no-unexpected-multiline": [
      "error"
    ],
    "no-unreachable": [
      "error"
    ],
    "no-unsafe-finally": [
      "error"
    ],
    "no-unsafe-negation": [
      "error"
    ],
    "require-atomic-updates": [
      "error"
    ],
    "use-isnan": [
      "error"
    ],
    "valid-typeof": [
      "error"
    ],
    "accessor-pairs": [
      "error",
      {
        "setWithoutGet": false,
        "getWithoutSet": false
      }
    ],
    "array-callback-return": [
      "error",
      {
        "allowImplicit": false
      }
    ],
    "block-scoped-var": [
      "error"
    ],
    "class-methods-use-this": [
      "error"
    ],
    "complexity": [
      "off"
    ],
    "consistent-return": [
      "error",
      {
        "treatUndefinedAsUnspecified": true
      }
    ],
    "curly": [
      "error",
      "all"
    ],
    "default-case": [
      "error",
      {
        "commentPattern": "^Skip\\sdefault$"
      }
    ],
    "dot-location": [
      "error",
      "property"
    ],
    "dot-notation": [
      "error",
      {
        "allowKeywords": false
      }
    ],
    "eqeqeq": [
      "error",
      "always"
    ],
    "guard-for-in": [
      "error"
    ],
    "max-classes-per-file": [
      "off"
    ],
    "no-alert": [
      "error"
    ],
    "no-caller": [
      "error"
    ],
    "no-case-declarations": [
      "error"
    ],
    "no-div-regex": [
      "error"
    ],
    "no-else-return": [
      "error"
    ],
    "no-empty-function": [
      "error"
    ],
    "no-empty-pattern": [
      "error"
    ],
    "no-eq-null": [
      "error"
    ],
    "no-eval": [
      "error",
      {
        "allowIndirect": false
      }
    ],
    "no-extend-native": [
      "error"
    ],
    "no-extra-bind": [
      "error"
    ],
    "no-extra-label": [
      "error"
    ],
    "no-fallthrough": [
      "error"
    ],
    "no-floating-decimal": [
      "error"
    ],
    "no-global-assign": [
      "error"
    ],
    "no-implicit-coercion": [
      "error"
    ],
    "no-implicit-globals": [
      "error"
    ],
    "no-implied-eval": [
      "error"
    ],
    "no-invalid-this": [
      "error"
    ],
    "no-iterator": [
      "error"
    ],
    "no-labels": [
      "error",
      {
        "allowLoop": false,
        "allowSwitch": false
      }
    ],
    "no-lone-blocks": [
      "error"
    ],
    "no-loop-func": [
      "error"
    ],
    "no-magic-numbers": [
      "off"
    ],
    "no-multi-spaces": [
      "error",
      {
        "ignoreEOLComments": false
      }
    ],
    "no-multi-str": [
      "error"
    ],
    "no-new": [
      "error"
    ],
    "no-new-func": [
      "error"
    ],
    "no-new-wrappers": [
      "error"
    ]
  }
};
