module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'cypress.*', 'cypress/*','vite.config.ts'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
  overrides: [
    {
      files: ['src/components/**/*'],
      rules: {
        'react-refresh/only-export-components': 'off'
      }
    },
    {
      files: ['src/store/scheduleStore.ts'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'off'
      }
    },
  ]
};