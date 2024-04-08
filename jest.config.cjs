// jest.config.js
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.\\.[t|j]sx?$": "babel-jest",
  },
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/src/$1', // Map @/* paths to src/*
    '^@@/(.*)$': '<rootDir>/test/$1', // Map @@/* paths to test/*
  },
};
