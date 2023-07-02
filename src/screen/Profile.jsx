import {
  View,
  Image,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Appbar, RadioButton} from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import styles from '../styles/global';
import HamburgerIcon from '../assets/images/hamburger.png';
import DocumentPicker from 'react-native-document-picker';
import {Formik} from 'formik';
import {useSelector} from 'react-redux';
import http from '../helpers/http';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArrowDown,
  faArrowUp,
  faChevronDown,
  faChevronRight,
  faChevronUp,
  faLock,
  faPencil,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';

const Profile = ({navigation}) => {
  const token = useSelector(state => state.auth.token);
  const [checked1, setChecked1] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(new Date());
  const [editEmail, setEditEmail] = React.useState(false);
  const [editUsername, setEditUsername] = React.useState(false);
  const [editPhoneNumber, setEditPhoneNumber] = React.useState(false);
  const [editName, setEditName] = React.useState(false);
  const [editGender, setEditGender] = React.useState(false);
  const [profile, setProfile] = React.useState([]);
  const [prof, setProf] = React.useState('');
  const [nation, setNation] = React.useState('');

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
          <Image
            style={styles.ImageStyle}
            source={{
              uri: `https://res.cloudinary.com/dxnewldiy/image/upload/v1683808473/${profile?.picture}`,
            }}
          />
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
