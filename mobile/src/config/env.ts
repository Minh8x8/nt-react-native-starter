import {Platform} from 'react-native';

const DEV_HOST = Platform.select({
  android: '10.0.2.2', // Android emulator → máy host
  ios: 'localhost', // iOS simulator
  default: 'localhost',
});

const ENV = {
  development: {
    BASE_URL: `http://${DEV_HOST}:3000`,
  },
  production: {
    BASE_URL: 'https://api.yourapp.com',
  },
};

export default __DEV__ ? ENV.development : ENV.production;
