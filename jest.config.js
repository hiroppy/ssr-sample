module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.(ts|tsx)',
    '!src/client/**/*.stories.tsx',
    '!src/types/*.d.ts',
    '!src/client/index.tsx',
    '!src/server/index.ts',
    '!src/server/server.ts'
  ],
  moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],
  testMatch: ['**/src/**/*.test.(ts|tsx)?(x)'],
  setupFilesAfterEnv: ['<rootDir>/setupTest.js']
};
