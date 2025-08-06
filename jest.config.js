module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  testMatch: [
    '**/__tests__/**/*.test.js'
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/e2e/',
    '/tests/',
    '/tests-examples/'
  ],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
};
