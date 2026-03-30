module.exports = {
  preset: 'react-native',
  setupFiles: ['./jest.setup.ts'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/src/store/product/',
    'src/services/axiosInstance.ts',
    'src/config/env.ts',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native' +
      '|@react-native' +
      '|@react-navigation' +
      '|react-native-vector-icons' +
      '|react-native-toast-message' +
      '|react-redux' +
      '|@reduxjs' +
      '|immer' +
      '|redux' +
      '|@tanstack' +
      '|@react-native-async-storage' + // Recommended to add this to transform patterns
      ')/)',
  ],
};
