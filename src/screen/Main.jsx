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
import EditProfile from './EditProfile';
import http from '../helpers/http';
import CreateEvent from './CreateEvent';
import UpdateEvent from './UpdateEvent';
import SearchResults from './SearchResults';
import styles from '../styles/global';
import {PaperProvider, MD3LightTheme as DefaultTheme} from 'react-native-paper';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {faArrowRightFromBracket} from '@fortawesome/free-solid-svg-icons';
import {logout} from '../redux/reducers/auth';
import {
  faHeart,
  faHome,
  faListCheck,
  faPlusSquare,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';

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

const CustomDrawer = props => {
  const [profile, setProfile] = React.useState([]);
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      async function getProfile() {
        try {
          const {data} = await http(token).get('/profile');
          setProfile(data.results);
        } catch (err) {
          console.warn(err);
        }
      }

      getProfile();
    }, [token]),
  );

  const doLogout = () => {
    dispatch(logout());
  };

  return (
    <View style={styles.CustomDrawerWrapper}>
      <DrawerContentScrollView {...props}>
        <TouchableOpacity
          style={styles.ProfileWrapper}
          onPress={() => navigation.navigate('Profile')}>
          {profile?.picture === null && (
            <Image
              source={require('../assets/images/images.png')}
              style={styles.ProfileImgWrapper}
            />
          )}
          {profile?.picture !== null && (
            <Image
              source={{
                uri: `https://res.cloudinary.com/dxnewldiy/image/upload/v1683808473/${profile?.picture}`,
              }}
              style={styles.ProfileImgWrapper}
            />
          )}
          <View>
            <Text style={styles.FullNameStyle}>{profile?.fullName}</Text>
            <View style={styles.ProfessionWrapper}>
              <Text style={styles.ProfessionTextStyle}>
                {profile?.profession === null ? (
                  <Text>Not Set</Text>
                ) : (
                  profile?.profession
                )}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.DrawerItemWrapper}>
          <DrawerItemList {...props} />
          <View>
            <TouchableOpacity onPress={doLogout} style={styles.LogoutBtnStyle}>
              <View style={styles.LogoutWrapper}>
                <FontAwesomeIcon
                  icon={faArrowRightFromBracket}
                  size={25}
                  color="red"
                />
                <Text style={styles.LogoutTextStyle}>Sign Out</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

const HomeComponent = () => <FontAwesomeIcon icon={faHome} color="gray" />;
const ProfileComponent = () => (
  <FontAwesomeIcon icon={faUserCircle} size={25} color="gray" />
);
const ManageEventComponent = () => (
  <FontAwesomeIcon icon={faPlusSquare} size={25} color="gray" />
);
const MyBookingComponent = () => (
  <FontAwesomeIcon icon={faListCheck} size={25} color="gray" />
);
const MyWishlistsComponent = () => (
  <FontAwesomeIcon icon={faHeart} size={25} color="gray" />
);

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
            drawerContent={CustomDrawer}
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
                drawerIcon: HomeComponent,
                drawerItemStyle: {display: 'none'},
              }}
            />
            <Drawer.Screen
              name="Profile"
              component={Profile}
              options={{
                drawerIcon: ProfileComponent,
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
                drawerIcon: ManageEventComponent,
              }}
            />
            <Drawer.Screen
              name="My Booking"
              component={MyBooking}
              options={{
                drawerIcon: MyBookingComponent,
              }}
            />
            <Drawer.Screen
              name="My Wishlists"
              component={MyWishlists}
              options={{
                drawerIcon: MyWishlistsComponent,
              }}
            />
            <Drawer.Screen
              name="Detail Event"
              component={EventDetails}
              options={{
                drawerItemStyle: {display: 'none'},
                unmountOnBlur: true,
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
              name="Search Results"
              component={SearchResults}
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
          </Drawer.Navigator>
        )}
      </NavigationContainer>
    </PaperProvider>
  );
};

export default Main;
