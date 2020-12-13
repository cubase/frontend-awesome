module.exports = {
  preset: 'ts-jest',
  roots: ['<rootDir>/packages'],
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/packages/**/src/*.{ts,tsx}'],
  coveragePathIgnorePatterns: ['/node_modules/', '<rootDir>/packages/_types'],
  coverageReporters: ['json-summary', 'text', 'lcov'],
  verbose: true
}
