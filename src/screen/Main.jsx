import React from 'react';
import Home from './Home';
import Profile from './Profile';
import EventDetails from './EventDetails';
import MyBooking from './MyBooking';
import MyWishlists from './MyWishlists';
import PaymentMethod from './PaymentMethod';
import PurchaseTicket from './PurchaseTicket';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import ChangePassword from './ChangePassword';
import ManageEvent from './ManageEvent';
import {PaperProvider, MD3LightTheme as DefaultTheme} from 'react-native-paper';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useSelector} from 'react-redux';

const AuthStack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#19A7CE',
    secondary: '#77037B',
  },
};

const Main = () => {
  const token = useSelector(state => state.auth.token);
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        {!token && (
          <AuthStack.Navigator screenOptions={{headerShown: false}}>
            <AuthStack.Screen name="SignUp" component={SignUp} />
            <AuthStack.Screen name="SignIn" component={SignIn} />
            <AuthStack.Screen
              name="ForgotPassword"
              component={ForgotPassword}
            />
            <AuthStack.Screen name="ResetPassword" component={ResetPassword} />
          </AuthStack.Navigator>
        )}
        {token && (
          <Drawer.Navigator>
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="PurchaseTicket" component={PurchaseTicket} />
            <Drawer.Screen name="Profile" component={Profile} />
            <Drawer.Screen name="PaymentMethod" component={PaymentMethod} />
            <Drawer.Screen name="ManageEvent" component={ManageEvent} />
            <Drawer.Screen name="MyBooking" component={MyBooking} />
            <Drawer.Screen name="MyWishlists" component={MyWishlists} />
            <Drawer.Screen name="EventDetails" component={EventDetails} />
            <Drawer.Screen name="ChangePassword" component={ChangePassword} />
          </Drawer.Navigator>
        )}
      </NavigationContainer>
    </PaperProvider>
  );
};

export default Main;
