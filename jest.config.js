/** @type {import('@jest/types/build/Config').InitialOptions} */
module.exports = {
  testMatch: ['<rootDir>/src/**/*.test.ts'],
  collectCoverage: true,
  errorOnDeprecated: true,
  testEnvironment: 'node',
}
