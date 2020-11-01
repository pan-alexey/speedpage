/* eslint-disable filenames/match-regex */
module.exports =  {
  parser:  '@typescript-eslint/parser',  // Specifies the ESLint parser
  extends:  [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'prettier',
  ],
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
  plugins: [
    'filenames',
  ],
  parserOptions:  {
    ecmaVersion:  2018,  // Allows for the parsing of modern ECMAScript features
    sourceType:  'module',  // Allows for the use of imports
  },
  rules: {
    '@typescript-eslint/naming-convention': [
      'error',
      {
        'selector': 'interface',
        'format': ['PascalCase'],
        'custom': {
          'regex': '^I[A-Z]',
          'match': true,
        },
      },
    ],
    quotes: ['error', 'single'],
    semi: ['warn', 'always'],
    'comma-dangle': ['warn', 'always-multiline'],
    'no-undef': 'warn',
    'no-unused-vars': 'warn',
    'filenames/match-regex': [2, 
      [
        // '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
        '^([a-z][a-z0-9]*)(-[a-z0-9]+|.spec+)*$',
      ],
      true,
    ],
  },
};