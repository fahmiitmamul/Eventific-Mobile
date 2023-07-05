import {
  View,
  Image,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Appbar} from 'react-native-paper';
import styles from '../styles/global';
import HamburgerIcon from '../assets/images/hamburger.png';
import {useSelector} from 'react-redux';
import http from '../helpers/http';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faChevronRight,
  faLock,
  faPencil,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';

const Profile = ({navigation}) => {
  const token = useSelector(state => state.auth.token);
  const [profile, setProfile] = React.useState([]);

  React.useEffect(() => {
    const getProfile = async () => {
      const {data} = await http(token).get('/profile');
      setProfile(data.results);
    };
    getProfile();
  }, []);

  return (
    <ScrollView style={styles.ContentWrapper}>
      <Appbar.Header style={styles.ManageHeaderStyle}>
        <Appbar.Action
          color="black"
          icon={HamburgerIcon}
          onPress={() => {
            navigation.openDrawer();
          }}
        />
        <Appbar.Content
          titleStyle={{fontFamily: 'Poppins-Medium', paddingLeft: 115}}
          title="Profile"
        />
      </Appbar.Header>
      <View style={styles.PictureWrapper}>
        <View style={styles.PictureChildWrapper}>
          {profile?.picture === null && (
            <Image
              source={require('../assets/images/images.png')}
              style={styles.ImageStyle}
            />
          )}
          {profile?.picture !== null && (
            <Image
              source={{
                uri: `https://res.cloudinary.com/dxnewldiy/image/upload/v1683808473/${profile?.picture}`,
              }}
              style={styles.ImageStyle}
            />
          )}
        </View>
      </View>
      <View>
        <Text
          style={{
            fontFamily: 'Poppins-Medium',
            fontSize: 20,
            textAlign: 'center',
          }}>
          {profile?.fullName}
        </Text>
        <Text
          style={{
            fontFamily: 'Poppins-Medium',
            fontSize: 13,
            textAlign: 'center',
          }}>
          {profile?.profession}
        </Text>
      </View>
      <View>
        <View
          style={{
            margin: 20,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{fontFamily: 'Poppins-Medium', fontSize: 20}}>Card</Text>
          <View
            style={{
              borderWidth: 3,
              padding: 10,
              borderRadius: 5,
              borderStyle: 'dotted',
            }}>
            <FontAwesomeIcon icon={faPlus} />
          </View>
        </View>
        <View
          style={{
            margin: 20,
          }}>
          <Image source={require('../assets/images/card.png')} />
        </View>
        <TouchableOpacity
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginRight: 30,
          }}
          onPress={() => navigation.navigate('Edit Profile')}>
          <View
            style={{
              margin: 20,
              display: 'flex',
              flexDirection: 'row',
              gap: 10,
              alignItems: 'center',
            }}>
            <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon>
            <Text style={{fontFamily: 'Poppins-Medium'}}>Edit Profile</Text>
          </View>
          <View>
            <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginRight: 30,
          }}
          onPress={() => navigation.navigate('Change Password')}>
          <View
            style={{
              margin: 20,
              display: 'flex',
              flexDirection: 'row',
              gap: 10,
              alignItems: 'center',
            }}>
            <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
            <Text style={{fontFamily: 'Poppins-Medium'}}>Change Password</Text>
          </View>
          <View>
            <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Profile;
