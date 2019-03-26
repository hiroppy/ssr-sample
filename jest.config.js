module.exports = {
  testURL: 'http://localhost/',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.(ts|tsx)',
    '!src/client/**/*.stories.tsx',
    '!src/**/*.d.ts',
    '!src/client/index.tsx',
    '!src/server/index.ts',
    '!src/server/server.ts'
  ],
  moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json'
    }
  },
  testMatch: ['**/src/**/*.test.(ts|tsx)?(x)'],
  setupFilesAfterEnv: ['<rootDir>/setupTest.ts'],
  preset: 'ts-jest'
};
