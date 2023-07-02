import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import http from '../helpers/http';
import {useDispatch, useSelector} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArrowRightFromBracket,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import {logout} from '../redux/reducers/auth';

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
    }, []),
  );

  const doLogout = () => {
    dispatch(logout());
  };

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <TouchableOpacity
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 20,
            marginHorizontal: 10,
            marginVertical: 50,
          }}
          onPress={() => navigation.navigate('Profile')}>
          <Image
            source={{
              uri: `https://res.cloudinary.com/dxnewldiy/image/upload/v1683808473/${profile?.picture}`,
            }}
            style={{height: 80, width: 80, borderRadius: 40, marginBottom: 10}}
          />
          <View>
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'Poppins-Medium',
                marginBottom: 5,
              }}>
              {profile?.fullName}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  marginRight: 5,
                }}>
                {profile?.profession}
              </Text>
            </View>
          </View>
          <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
        </TouchableOpacity>
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
          <DrawerItemList {...props} />
          <View>
            <TouchableOpacity onPress={doLogout} style={{paddingVertical: 15}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 28,
                  marginLeft: 20,
                }}>
                <FontAwesomeIcon
                  icon={faArrowRightFromBracket}
                  size={25}
                  color="red"></FontAwesomeIcon>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: 'Poppins-Medium',
                    marginLeft: 5,
                    color: 'red',
                  }}>
                  Sign Out
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawer;
