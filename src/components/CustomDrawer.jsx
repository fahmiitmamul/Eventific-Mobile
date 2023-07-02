import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {useFocusEffect} from '@react-navigation/native';
import http from '../helpers/http';
import {useSelector} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';

const CustomDrawer = props => {
  const [profile, setProfile] = React.useState([]);
  const token = useSelector(state => state.auth.token);

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

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 20,
            marginHorizontal: 10,
            marginVertical: 50,
          }}>
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
        </View>
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{padding: 10}}>
        <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Poppins-Medium',
                marginLeft: 5,
              }}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
