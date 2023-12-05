module.exports = {
  extends: ['@geolonia'],

  env: {
    node: true,
    jest: true,
  },

  parserOptions: {
    project: './tsconfig.json',
  },
  ignorePatterns: [
    '/bin/*.js',
    '/dist/*',
  ],

  rules: {
    'no-console': 'off',
    'import/no-extraneous-dependencies': 'off',
  },
};
