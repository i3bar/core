const INDENTATION_SPACES_COUNT = 2;
const PARSER_ECMASCRIPT_VERSION = 2018;

module.exports = {
  "env": {
    "es6": true,
    "node": true
  },
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
    ],
    "no-octal": [
      "error"
    ],
    "no-octal-escape": [
      "error"
    ],
    "no-param-reassign": [
      "error"
    ],
    "no-proto": [
      "error"
    ],
    "no-redeclare": [
      "error",
      {
        "builtinGlobals": true
      }
    ],
    "no-return-assign": [
      "error",
      "always"
    ],
    "no-return-await": [
      "error"
    ],
    "no-script-url": [
      "error"
    ],
    "no-self-assign": [
      "error"
    ],
    "no-self-compare": [
      "error"
    ],
    "no-sequences": [
      "error"
    ],
    "no-throw-literal": [
      "error"
    ],
    "no-unmodified-loop-condition": [
      "error"
    ],
    "no-unused-expressions": [
      "error",
      {
        "allowShortCircuit": false,
        "allowTernary": false,
        "allowTaggedTemplates": false
      }
    ],
    "no-unused-labels": [
      "error"
    ],
    "no-useless-call": [
      "error"
    ],
    "no-useless-catch": [
      "error"
    ],
    "no-useless-concat": [
      "error"
    ],
    "no-useless-escape": [
      "error"
    ],
    "no-useless-return": [
      "error"
    ],
    "no-void": [
      "error"
    ],
    "no-warning-comments": [
      "error"
    ],
    "no-with": [
      "error"
    ],
    "prefer-named-capture-group": [
      "error"
    ],
    "prefer-promise-reject-errors": [
      "error"
    ],
    "radix": [
      "error",
      "always"
    ],
    "require-await": [
      "error"
    ],
    "vars-on-top": [
      "error"
    ],
    "wrap-iife": [
      "error",
      "inside"
    ],
    "yoda": [
      "error",
      "always"
    ],
    "strict": [
      "error",
      "global"
    ],
    "init-declarations": [
      "error",
      "always"
    ],
    "no-delete-var": [
      "error"
    ],
    "no-label-var": [
      "error"
    ],
    "no-shadow": [
      "error"
    ],
    "no-shadow-restricted-names": [
      "error"
    ],
    "no-undef": [
      "error",
      {
        "typeof": true
      }
    ],
    "no-undef-init": [
      "error"
    ],
    "no-undefined": [
      "error"
    ],
    "no-unused-vars": [
      "error",
      {
        "vars": "all",
        "args": "after-used",
        "ignoreRestSiblings": false,
        "caughtErrors": "all"
      }
    ],
    "no-use-before-define": [
      "error",
      {
        "functions": true,
        "classes": true,
        "variables": true
      }
    ],
    "global-require": [
      "error"
    ],
    "no-buffer-constructor": [
      "error"
    ],
    "no-mixed-requires": [
      "error",
      {
        "grouping": false,
        "allowCall": false
      }
    ],
    "no-new-require": [
      "error"
    ],
    "no-path-concat": [
      "error"
    ],
    "no-process-exit": [
      "error"
    ],
    "no-sync": [
      "error",
      {
        "allowAtRootLevel": false
      }
    ],
    "array-bracket-newline": [
      "error",
      {
        "multiline": true,
        "minItems": null
      }
    ],
    "array-bracket-spacing": [
      "error",
      "always",
      {
        "singleValue": true,
        "objectsInArrays": false,
        "arraysInArrays": false
      }
    ],
    "array-element-newline": [
      "error",
      {
        "multiline": true,
        "minItems": null
      }
    ],
    "block-spacing": [
      "error",
      "always"
    ],
    "brace-style": [
      "error",
      "1tbs",
      {
        "allowSingleLine": false
      }
    ],
    "capitalized-comments": [
      "error",
      "always"
    ],
    "comma-dangle": [
      "error",
      "never"
    ],
    "comma-spacing": [
      "error",
      {
        "before": false,
        "after": true
      }
    ],
    "comma-style": [
      "error",
      "last"
    ],
    "computed-property-spacing": [
      "error",
      "always"
    ],
    "consistent-this": [
      "error",
      "self"
    ],
    "eol-last": [
      "error",
      "always"
    ],
    "func-call-spacing": [
      "error",
      "never"
    ],
    "func-name-matching": [
      "error",
      "never",
      {
        "considerPropertyDescriptor": false
      }
    ],
    "func-names": [
      "error",
      "never",
      {
        "generators": "never"
      }
    ],
    "func-style": [
      "error",
      "declaration",
      {
        "allowArrowFunctions": false
      }
    ],
    "function-paren-newline": [
      "error",
      "multiline"
    ],
    "implicit-arrow-linebreak": [
      "error",
      "beside"
    ],
    "key-spacing": [
      "error",
      {
        "beforeColon": false,
        "afterColon": true,
        "mode": "strict"
      }
    ],
    "keyword-spacing": [
      "error",
      {
        "before": true,
        "after": true
      }
    ],
    "line-comment-position": [
      "error",
      "above"
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "lines-between-class-members": [
      "error",
      "always"
    ],
    "multiline-comment-style": [
      "error",
      "starred-block"
    ],
    "multiline-ternary": [
      "error",
      "never"
    ],
    "new-cap": [
      "error",
      {
        "newIsCap": true,
        "capIsNew": true,
        "properties": true
      }
    ],
    "new-parens": [
      "error",
      "always"
    ],
    "no-array-constructor": [
      "error"
    ],
    "no-bitwise": [
      "error"
    ],
    "no-continue": [
      "error"
    ],
    "no-lonely-if": [
      "error"
    ],
    "no-mixed-operators": [
      "error"
    ],
    "no-mixed-spaces-and-tabs": [
      "error"
    ],
    "no-multi-assign": [
      "error"
    ],
    "no-multiple-empty-lines": [
      "error",
      {
        "max": 1
      }
    ],
    "no-negated-condition": [
      "error"
    ],
    "no-nested-ternary": [
      "error"
    ],
    "no-new-object": [
      "error"
    ],
    "no-plusplus": [
      "error",
      {
        "allowForLoopAfterthoughts": true
      }
    ],
    "no-tabs": [
      "error",
      {
        "allowIndentationTabs": false
      }
    ],
    "no-ternary": [
      "error"
    ],
    "no-trailing-spaces": [
      "error",
      {
        "skipBlankLines": false,
        "ignoreComments": false
      }
    ],
    "no-underscore-dangle": [
      "error",
      {
        "allowAfterThis": false,
        "allowAfterSuper": false,
        "enforceInMethodNames": true
      }
    ],
    "no-unneeded-ternary": [
      "error",
      {
        "defaultAssignment": false
      }
    ],
    "no-whitespace-before-property": [
      "error"
    ],
    "nonblock-statement-body-position": [
      "error",
      "beside"
    ],
    "object-curly-newline": [
      "error",
      {
        "multiline": true
      }
    ],
    "object-curly-spacing": [
      "error",
      "always",
      {
        "arraysInObjects": false,
        "objectsInObjects": false
      }
    ],
    "object-property-newline": [
      "error",
      {
        "allowAllPropertiesOnSameLine": true
      }
    ],
    "one-var": [
      "error",
      "always"
    ],
    "one-var-declaration-per-line": [
      "error",
      "always"
    ],
    "operator-assignment": [
      "error",
      "never"
    ],
    "operator-linebreak": [
      "error",
      "none"
    ],
    "padded-blocks": [
      "error",
      "never",
      {
        "allowSingleLineBlocks": false
      }
    ],
    "prefer-object-spread": [
      "error"
    ],
    "quote-props": [
      "error",
      "consistent-as-needed"
    ],
    "semi-spacing": [
      "error",
      {
        "before": false,
        "after": true
      }
    ],
    "semi-style": [
      "error",
      "last"
    ],
    "space-before-blocks": [
      "error",
      "always"
    ],
    "space-before-function-paren": [
      "error",
      {
        "anonymous": "never",
        "named": "never",
        "asyncArrow": "always"
      }
    ],
    "space-in-parens": [
      "error",
      "never"
    ],
    "space-infix-ops": [
      "error",
      {
        "int32Hint": false
      }
    ],
    "space-unary-ops": [
      "error",
      {
        "words": true,
        "nonwords": false
      }
    ],
    "spaced-comment": [
      "error",
      "always"
    ],
    "switch-colon-spacing": [
      "error",
      {
        "after": true,
        "before": false
      }
    ],
    "template-tag-spacing": [
      "error",
      "never"
    ],
    "unicode-bom": [
      "error",
      "never"
    ],
    "wrap-regex": [
      "error"
    ],
    "arrow-body-style": [
      "error",
      "as-needed",
      {
        "requireReturnForObjectLiteral": false
      }
    ],
    "arrow-parens": [
      "error",
      "as-needed",
      {
        "requireForBlockBody": false
      }
    ],
    "arrow-spacing": [
      "error",
      {
        "after": true,
        "before": true
      }
    ],
    "constructor-super": [
      "error"
    ],
    "generator-star-spacing": [
      "error",
      {
        "before": false,
        "after": true
      }
    ],
    "no-class-assign": [
      "error"
    ],
    "no-confusing-arrow": [
      "error",
      {
        "allowParens": true
      }
    ],
    "no-const-assign": [
      "error"
    ],
    "no-dupe-class-members": [
      "error"
    ],
    "no-duplicate-imports": [
      "error"
    ],
    "no-new-symbol": [
      "error"
    ],
    "no-this-before-super": [
      "error"
    ],
    "no-useless-computed-key": [
      "error"
    ],
    "no-useless-constructor": [
      "error"
    ],
    "no-useless-rename": [
      "error",
      {
        "ignoreImport": false,
        "ignoreExport": false,
        "ignoreDestructuring": false
      }
    ],
    "no-var": [
      "error"
    ],
    "object-shorthand": [
      "error",
      "always",
      {
        "avoidQuotes": true,
        "ignoreConstructors": false,
        "avoidExplicitReturnArrows": false
      }
    ],
    "prefer-const": [
      "error",
      {
        "destructuring": "all",
        "ignoreReadBeforeAssign": false
      }
    ],
    "prefer-template": [
      "error"
    ],
    "require-yield": [
      "error"
    ],
    "rest-spread-spacing": [
      "error",
      "never"
    ],
    "yield-star-spacing": [
      "error",
      {
        "after": true,
        "before": false
      }
    ]
  }
};
