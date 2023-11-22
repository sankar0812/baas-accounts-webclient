module.exports = {
    type: 'module',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
    "transform": {
        "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
    }
};
