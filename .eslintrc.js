module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    camelcase: ['error', { properties: 'never', ignoreDestructuring: true }],
    'linebreak-style': 0,
  },
};
