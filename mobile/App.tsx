import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ActivityIndicator, View} from 'react-native';
import {SignInScreen} from './src/screens/signin-screen';
import {AuthProvider, useAuth} from './src/contexts/auth-context';
import MainNavigator from './src/screens/navigator/main-navigator';
import {Provider} from 'react-redux';
import store from './src/stores/store';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Provider>
  );
};

const AppContent: React.FC = () => {
  const {token, isLoading} = useAuth();

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          name="List"
          component={ListScreen}
          options={{ title: 'List Screen' }}
        /> */}
        {token ? (
          <Stack.Screen
            name="Main"
            component={MainNavigator}
            options={{title: 'ReactNativeStater'}}
          />
        ) : (
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{title: 'SignIn Screen'}}
          />
        )}
        {/* <Stack.Screen
          name="Demo"
          component={DemoUseContext}
          options={{ title: 'Demo Screen' }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
