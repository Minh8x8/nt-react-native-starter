import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SignInScreen} from './src/screens/signin-screen';
import {AuthProvider, useAuth} from './src/contexts/auth-context';
import MainNavigator from './src/screens/navigator/main-navigator';
import {Provider} from 'react-redux';
import store from './src/stores/store';
import {QueryProvider} from './src/providers/QueryProvider';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <QueryProvider>
      <Provider store={store}>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </Provider>
    </QueryProvider>
  );
};

const AppContent: React.FC = () => {
  const {token} = useAuth();

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
            options={{headerShown: false}}
          />
        ) : (
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{headerShown: false}}
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
