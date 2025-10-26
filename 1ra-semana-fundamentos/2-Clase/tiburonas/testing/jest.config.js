// jest.config.js
module.exports = {
  testEnvironment: 'node',
  testMatch: [
    '**/test/**/*.test.js'
  ],
  collectCoverageFrom: [
    '**/*.js',
    '!node_modules/**',
    '!jest.config.js'
  ],
  setupFilesAfterEnv: ['<rootDir>/test/setup.js']
};