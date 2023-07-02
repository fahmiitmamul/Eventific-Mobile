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
import CustomDrawer from '../components/CustomDrawer';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faGear,
  faHeart,
  faHome,
  faListCheck,
  faManatSign,
  faPerson,
  faPlusSquare,
  faUser,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import UpdateEvent from './UpdateEvent';

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
            <AuthStack.Screen name="SignIn" component={SignIn} />
            <AuthStack.Screen name="SignUp" component={SignUp} />
            <AuthStack.Screen
              name="ForgotPassword"
              component={ForgotPassword}
            />
            <AuthStack.Screen name="ResetPassword" component={ResetPassword} />
          </AuthStack.Navigator>
        )}
        {token && (
          <Drawer.Navigator
            drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={{
              headerShown: false,
              drawerActiveBackgroundColor: '#fff',
              drawerActiveTintColor: '#19a7ce',
              drawerInactiveTintColor: '#333',
              drawerLabelStyle: {
                fontFamily: 'Poppins-Medium',
                fontSize: 13,
              },
            }}>
            <Drawer.Screen
              name="Home"
              component={Home}
              options={{
                drawerIcon: ({color}) => (
                  <FontAwesomeIcon icon={faHome} color="gray"></FontAwesomeIcon>
                ),
                drawerItemStyle: {display: 'none'},
              }}
            />
            <Drawer.Screen
              name="Profile"
              component={Profile}
              options={{
                drawerIcon: ({color}) => (
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    size={25}
                    color="gray"></FontAwesomeIcon>
                ),
              }}
            />
            <Drawer.Screen
              name="Edit Profile"
              component={EditProfile}
              options={{
                drawerItemStyle: {display: 'none'},
              }}
            />
            <Drawer.Screen
              name="Manage Event"
              component={ManageEvent}
              options={{
                drawerIcon: ({color}) => (
                  <FontAwesomeIcon
                    icon={faPlusSquare}
                    size={25}
                    color="gray"></FontAwesomeIcon>
                ),
              }}
            />
            <Drawer.Screen
              name="My Booking"
              component={MyBooking}
              options={{
                drawerIcon: ({color}) => (
                  <FontAwesomeIcon
                    icon={faListCheck}
                    size={25}
                    color="gray"></FontAwesomeIcon>
                ),
              }}
            />
            <Drawer.Screen
              name="My Wishlists"
              component={MyWishlists}
              options={{
                drawerIcon: ({color}) => (
                  <FontAwesomeIcon
                    icon={faHeart}
                    size={25}
                    color="gray"></FontAwesomeIcon>
                ),
              }}
            />
            <Drawer.Screen
              name="Detail Event"
              component={EventDetails}
              options={{
                drawerItemStyle: {display: 'none'},
              }}
            />
            <Drawer.Screen
              name="Change Password"
              component={ChangePassword}
              options={{
                drawerItemStyle: {display: 'none'},
              }}
            />
            <Drawer.Screen
              name="Payment Method"
              component={PaymentMethod}
              options={{
                drawerItemStyle: {display: 'none'},
              }}
            />
            <Drawer.Screen
              name="Purchase Ticket"
              component={PurchaseTicket}
              options={{
                drawerItemStyle: {display: 'none'},
              }}
            />
            <Drawer.Screen
              name="Create Event"
              component={CreateEvent}
              options={{
                drawerItemStyle: {display: 'none'},
              }}
            />
            <Drawer.Screen
              name="Update Event"
              component={UpdateEvent}
              options={{
                drawerItemStyle: {display: 'none'},
              }}
            />
            {/* <Drawer.Screen
              name="Settings"
              component={CreateEvent}
              options={{
                drawerIcon: ({color}) => (
                  <FontAwesomeIcon
                    icon={faGear}
                    size={25}
                    color="gray"></FontAwesomeIcon>
                ),
              }}
            /> */}
          </Drawer.Navigator>
        )}
      </NavigationContainer>
    </PaperProvider>
  );
};

export default Main;
