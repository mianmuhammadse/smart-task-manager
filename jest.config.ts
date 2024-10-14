import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  forceExit: true,
  testMatch: ["**/*.test.ts"],
  detectOpenHandles: true,
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  // clearMocks: true
}

export default config;
