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
import EditProfile from './EditProfile';
import CreateEvent from './CreateEvent';

const AuthStack = createNativeStackNavigator();
const PaymentStack = createNativeStackNavigator();
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
          <Drawer.Navigator screenOptions={{headerShown: false}}>
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Profile" component={Profile} />
            <Drawer.Screen name="Edit Profile" component={EditProfile} />
            <Drawer.Screen name="Manage Event" component={ManageEvent} />
            <Drawer.Screen name="My Booking" component={MyBooking} />
            <Drawer.Screen name="My Wishlists" component={MyWishlists} />
            <Drawer.Screen name="Detail Event" component={EventDetails} />
            <Drawer.Screen name="Change Password" component={ChangePassword} />
            <Drawer.Screen name="Payment Method" component={PaymentMethod} />
            <Drawer.Screen name="Purchase Ticket" component={PurchaseTicket} />
            <Drawer.Screen name="Create Event" component={CreateEvent} />
          </Drawer.Navigator>
        )}
      </NavigationContainer>
    </PaperProvider>
  );
};

export default Main;
