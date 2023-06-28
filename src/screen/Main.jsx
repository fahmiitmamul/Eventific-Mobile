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
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <AuthStack.Navigator screenOptions={{headerShown: false}}>
          <AuthStack.Screen name="SignUp" component={SignUp} />
          <AuthStack.Screen name="SignIn" component={SignIn} />
          <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
          <AuthStack.Screen name="ResetPassword" component={ResetPassword} />
          <AuthStack.Screen name="Home" component={Home} />
          <AuthStack.Screen name="PurchaseTicket" component={PurchaseTicket} />
          <AuthStack.Screen name="Profile" component={Profile} />
          <AuthStack.Screen name="PaymentMethod" component={PaymentMethod} />
          <AuthStack.Screen name="ManageEvent" component={ManageEvent} />
          <AuthStack.Screen name="MyBooking" component={MyBooking} />
          <AuthStack.Screen name="MyWishlists" component={MyWishlists} />
          <AuthStack.Screen name="EventDetails" component={EventDetails} />
          <AuthStack.Screen name="ChangePassword" component={ChangePassword} />
        </AuthStack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default Main;
