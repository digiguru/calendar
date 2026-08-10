import js from '@eslint/js';

const browserGlobals = {
  window: 'readonly',
  document: 'readonly',
  localStorage: 'readonly',
  console: 'readonly',
};

const testGlobals = {
  describe: 'readonly',
  it: 'readonly',
  expect: 'readonly',
  beforeEach: 'readonly',
  afterEach: 'readonly',
};

export default [
  {
    ignores: [
      'dist/**',
      'coverage/**',
      'public/**',
      // Retired CRA presentation files remain only as migration reference.
      'src/About.js',
      'src/App.js',
      'src/AppHolder.js',
      'src/index.js',
      'src/projects.js',
      'src/serviceWorker.js',
      'src/views/FormElements/**',
      'src/views/KeyEvents/**',
      'src/views/PeopleProject/**',
      'src/views/ProjectDetails/**',
      'src/views/SaveArea/**',
      'src/views/TeamSlider.js',
      // The legacy calculation layer is protected by its existing test suite;
      // modernising its style is deliberately separate from this UI migration.
      'src/logic/**',
    ],
  },
  js.configs.recommended,
  {
    files: ['vite.config.js', 'src/**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: browserGlobals,
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^React$' }],
    },
  },
  {
    files: ['src/**/*.test.js'],
    languageOptions: {
      globals: testGlobals,
    },
  },
];
