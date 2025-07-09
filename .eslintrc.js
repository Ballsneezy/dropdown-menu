module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    // You can override Airbnb rules here if needed
    'no-console': 'off', // Allow console.log for debugging
    'import/extensions': ['error', 'ignorePackages'],
    'no-param-reassign': ['error', { props: false }], // Allow parameter reassignment
    'class-methods-use-this': 'off', // Allow methods that don't use 'this'
  },
};
