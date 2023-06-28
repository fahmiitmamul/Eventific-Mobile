import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/screen/Home';
import Profile from './src/screen/Profile';
import EventDetails from './src/screen/EventDetails';
import MyBooking from './src/screen/MyBooking';
import MyWishlists from './src/screen/MyWishlists';
import PaymentMethod from './src/screen/PaymentMethod';
import PurchaseTicket from './src/screen/PurchaseTicket';
import SignIn from './src/screen/SignIn';
import SignUp from './src/screen/SignUp';
import ForgotPassword from './src/screen/ForgotPassword';
import ResetPassword from './src/screen/ResetPassword';
import ChangePassword from './src/screen/ChangePassword';
import {PaperProvider, MD3LightTheme as DefaultTheme} from 'react-native-paper';
import {Provider} from 'react-redux';
import {store, persistor} from './src/redux/store';
import {PersistGate} from 'redux-persist/lib/integration/react';
import ManageEvent from './src/screen/ManageEvent';

const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#19A7CE',
    secondary: '#77037B',
  },
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen name="PurchaseTicket" component={PurchaseTicket} />
              <Stack.Screen name="SignUp" component={SignUp} />
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
              <Stack.Screen name="ManageEvent" component={ManageEvent} />
              <Stack.Screen name="SignIn" component={SignIn} />
              <Stack.Screen name="MyBooking" component={MyBooking} />
              <Stack.Screen name="MyWishlists" component={MyWishlists} />
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="EventDetails" component={EventDetails} />
              <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
              <Stack.Screen name="ResetPassword" component={ResetPassword} />
              <Stack.Screen name="ChangePassword" component={ChangePassword} />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
