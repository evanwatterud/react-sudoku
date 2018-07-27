module.exports = {
  "parser": "babel-eslint",
  "rules": {
    "strict": 0,
    "jsx-a11y/href-no-hash": "off",
  },
  "env": {
    "browser": true,
    "es6": true,
    "jquery": true
  },
  "extends": "airbnb",
  "parserOptions": {
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "comma-dangle": [
      "warn",
      "never"
    ],
    "indent": [
      "warn",
      2
    ],
    "linebreak-style": [
      "warn",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "never"
    ],
    "arrow-body-style": [
      "error",
      "always"
    ],
    "max-len": [
      "error",
      { "code": 5000 }
    ],
    "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    /* Advanced Rules*/
    "no-unused-expressions": "warn",
    "no-useless-concat": "warn",
    "block-scoped-var": "error",
    "consistent-return": "error",
  }
};
