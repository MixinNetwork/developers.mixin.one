module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  globals: {
    window: true,
    document: true,
    _vm: true,
  },
  rules: {
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    semi: 'error',
    camelcase: 'off',
    'no-plusplus': 'off',
    'no-param-reassign': 'off',
    'no-underscore-dangle': 'off',
    'max-len': [
      'error',
      {
        code: 150,
      },
    ],
  },
  plugins: ['eslint-plugin-import'],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
        ],
        extensions: ['.js', '.vue'],
      },
    },
  },
};
