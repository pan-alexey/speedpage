/* eslint-disable filenames/match-regex */
module.exports = {
  roots: [
    '<rootDir>/src',
    '<rootDir>/tests/e2e',
  ],
  modulePathIgnorePatterns: ['<rootDir>/tests/package'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
};