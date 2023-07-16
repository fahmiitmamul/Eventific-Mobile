import {View, Image, Text, TouchableOpacity} from 'react-native';
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
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const Profile = ({navigation}) => {
  const token = useSelector(state => state.auth.token);
  const [profile, setProfile] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const getProfile = async () => {
      setLoading(true);
      const {data} = await http(token).get('/profile');
      setLoading(false);
      setProfile(data.results);
    };
    getProfile();
  }, [token]);

  return (
    <View style={styles.ContentWrapper}>
      <Appbar.Header style={styles.ManageHeaderStyle}>
        <Appbar.Action
          color="white"
          icon={HamburgerIcon}
          onPress={() => {
            navigation.openDrawer();
          }}
        />
        <Appbar.Content
          titleStyle={styles.ProfileAppbarContent}
          title="Profile"
        />
      </Appbar.Header>
      <View style={styles.ProfileWrapperStyle}>
        {!loading ? (
          <View>
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
              <Text style={styles.ProfileTextStyle}>{profile?.fullName}</Text>
              <Text style={styles.ProfileProfession}>
                {profile?.profession === null ? (
                  <Text>Profession Not set</Text>
                ) : (
                  profile?.profession
                )}
              </Text>
            </View>
          </View>
        ) : (
          <View>
            <SkeletonPlaceholder borderRadius={4}>
              <SkeletonPlaceholder.Item
                flexDirection="column"
                alignItems="center"
                marginTop={20}>
                <SkeletonPlaceholder.Item
                  width={160}
                  height={160}
                  borderRadius={130}
                />
                <SkeletonPlaceholder.Item
                  flexDirection="column"
                  gap={3}
                  marginTop={5}
                  justifyContent="center"
                  alignItems="center">
                  <SkeletonPlaceholder.Item width={30} height={10} />
                  <SkeletonPlaceholder.Item width={120} height={30} />
                </SkeletonPlaceholder.Item>
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
          </View>
        )}
        <View>
          <View style={styles.ProfileCardWrapper}>
            <Text style={styles.ProfileTextStyle}>Card</Text>
            <View style={styles.PlusBtnStyle}>
              <FontAwesomeIcon icon={faPlus} />
            </View>
          </View>
          <View style={styles.CardWrapperStyle}>
            <Image source={require('../assets/images/card.png')} />
          </View>
          <TouchableOpacity
            style={styles.EditProfileStyle}
            onPress={() => navigation.navigate('Edit Profile')}>
            <View style={styles.EditProfileWrapper}>
              <FontAwesomeIcon icon={faPencil} />
              <Text style={styles.PoppinsMedium}>Edit Profile</Text>
            </View>
            <View>
              <FontAwesomeIcon icon={faChevronRight} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.ChangePasswordStyle}
            onPress={() => navigation.navigate('Change Password')}>
            <View style={styles.ChangePasswordText}>
              <FontAwesomeIcon icon={faLock} />
              <Text style={styles.PoppinsMedium}>Change Password</Text>
            </View>
            <View>
              <FontAwesomeIcon icon={faChevronRight} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Profile;
