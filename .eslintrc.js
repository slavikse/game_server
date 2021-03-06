module.exports = {
  extends: 'airbnb-base',
  env: {
    browser: false,
    node: true,
    jest: true,
  },
  rules: {
    'no-use-before-define': 'off',
    'no-console': 'off',
    'no-param-reassign': 'off',
    'object-curly-newline': 'off',
    'import/prefer-default-export': 'off',
  },
};
