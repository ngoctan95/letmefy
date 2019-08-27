module.exports = {
  "parser": "babel-eslint",
  "env": {
      "browser": true,
      "commonjs": true,
      "es6": true,
      "node": true
  },
  "extends": ["eslint:recommended", "plugin:react/recommended"],
  "parserOptions": {
      "ecmaVersion": 2018,
      "sourceType": "module"
  },
  "rules": {
      "indent": [
          "error",
          "tab"
      ],
      "react/prop-types": "off", // Remove warning proptypes
      "linebreak-style": [
          "error",
          "unix"
      ],
      'no-use-before-define': 'off', // No need to define any props to use it
      'react/jsx-filename-extension': 'off', // Allow for using ts or something like this
      "quotes": [ // Add/allow single-double
          "error",
          "double"
      ],
      "semi": [
          "error",
          "always"
      ],

      // "import/prefer-default-export": false, // Remove warning import/export, but it will not auto fix for us
      "object-curly-spacing": ["error", "never"], // For spacing
      "no-mixed-spaces-and-tabs": 0, // Allow mixed space and tab with 0 indent
      "react/jsx-uses-vars": 2,
      // {
      //   "no-empty": [2, { "methods": true } ]
      // },
      // "no-empty": [ { // Allow empty try catch
      //   "allowEmptyCatch": true
      // }]
  }
};