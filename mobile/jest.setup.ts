import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Mock Toast
jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
  hide: jest.fn(),
}));

jest.mock(
  'react-native-reanimated',
  () => {
    const mock = {
      __esModule: true,
      default: {call: jest.fn()},
      Easing: {
        linear: jest.fn(),
        ease: jest.fn(),
        quad: jest.fn(),
      },
      useSharedValue: jest.fn((value?: unknown) => ({value})),
      useAnimatedStyle: jest.fn(cb => cb()),
      withTiming: jest.fn(value => value),
      withSpring: jest.fn(value => value),
      withDelay: jest.fn((_, value) => value),
      withSequence: jest.fn(values => values),
      runOnJS: jest.fn(fn => fn),
    };
    return mock;
  },
  {virtual: true},
);

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('react-native-keychain', () => ({
  setGenericPassword: jest.fn(),
  getGenericPassword: jest.fn(),
  resetGenericPassword: jest.fn(),
  getInternetCredentials: jest.fn(),
  setInternetCredentials: jest.fn(),
  resetInternetCredentials: jest.fn(),
}));
