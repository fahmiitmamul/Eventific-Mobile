import 'react-native-gesture-handler';
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
import {createDrawerNavigator} from '@react-navigation/drawer';

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

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
              <Stack.Screen name="SignUp" component={SignUp} />
              <Stack.Screen name="SignIn" component={SignIn} />
              <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
              <Stack.Screen name="ResetPassword" component={ResetPassword} />
              <Drawer.Navigator>
                <Drawer.Screen name="Home" component={Home} />
                <Drawer.Screen
                  name="PurchaseTicket"
                  component={PurchaseTicket}
                />
                <Drawer.Screen name="Profile" component={Profile} />
                <Drawer.Screen name="PaymentMethod" component={PaymentMethod} />
                <Drawer.Screen name="ManageEvent" component={ManageEvent} />
                <Drawer.Screen name="MyBooking" component={MyBooking} />
                <Drawer.Screen name="MyWishlists" component={MyWishlists} />
                <Drawer.Screen name="EventDetails" component={EventDetails} />
                <Drawer.Screen
                  name="ChangePassword"
                  component={ChangePassword}
                />
              </Drawer.Navigator>
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
