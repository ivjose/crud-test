/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.jest.json',
    },
  },
  setupFilesAfterEnv: ['./src/jest.setup.ts'],
  moduleNameMapper: {
    '@components/(.*)': '<rootDir>/src/components/$1',
    '@test-utils/(.*)': '<rootDir>/src/test-utils/$1',
  },
  moduleDirectories: [
    'node_modules',
    // add the directory with the test-utils.js file, for example:
    'utils', // a utility folder
    'test-utils',
    'Intersection-observer',
    __dirname, // the root directory
  ],
}
