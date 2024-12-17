module.exports = {
    testEnvironment: 'node',
    testMatch: ['**/__tests__/**/*.test.js'],
    setupFilesAfterEnv: ['./__tests__/setup.js'],
    moduleFileExtensions: ['js', 'json', 'node'],
    verbose: true
  };