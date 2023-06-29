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

const Profile = ({navigation}) => {
  const token = useSelector(state => state.auth.token);
  const [checked1, setChecked1] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(new Date());
  const [fileResponse, setFileResponse] = React.useState([]);
  const [editEmail, setEditEmail] = React.useState(false);
  const [editUsername, setEditUsername] = React.useState(false);
  const [editPhoneNumber, setEditPhoneNumber] = React.useState(false);
  const [editName, setEditName] = React.useState(false);
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

  const editProfile = async values => {
    const form = new FormData();

    Object.keys(values).forEach(key => {
      if (values[key]) {
        form.append(key, values[key]);
      }
    });

    if (fileResponse) {
      form.append('picture', fileResponse);
    }
    if (prof) {
      form.append('profession', prof);
    }
    if (nation) {
      form.append('nationality', nation);
    }
    if (date) {
      form.append('birthDate', moment(date).format('YYYY-MM-DD'));
    }

    if (checked1 === true) {
      form.append('gender', true);
    }

    if (checked2 === true) {
      form.append('gender', false);
    }

    const getProfile = async () => {
      const {data} = await http(token).get('/profile');
      setProfile(data.results);
    };

    try {
      const {data} = await http(token).patch('/profile', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setProfile(data.results);
    } catch (err) {
      console.warn(err);
    }

    setEditEmail(false);
    setEditPhoneNumber(false);
    setEditUsername(false);
    setEditName(false);
    getProfile();
  };

  const profession = [
    'Web Developer',
    'Network Engineer',
    'Database Administrator',
  ];
  const nationality = ['Indonesia', 'Malaysia', 'Singapore', 'Vietnam'];

  const handleDocumentSelection = React.useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
      });
      const file = response[0];
      setFileResponse(file);
    } catch (err) {
      console.warn(err);
    }
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
        <Appbar.Content titleStyle={styles.FontStyle} title="Profile" />
      </Appbar.Header>
      <Formik
        initialValues={{
          fullName: profile?.fullName,
          email: profile?.email,
          phoneNumber: profile?.phoneNumber,
          profession: profile?.profession,
          nationality: profile?.nationality,
          birthDate: profile?.birthDate,
        }}
        onSubmit={editProfile}>
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
        }) => {
          return (
            <>
              <View style={styles.PictureWrapper}>
                <View style={styles.PictureChildWrapper}>
                  <Image
                    style={styles.ImageStyle}
                    source={require('../assets/images/profilephoto.jpg')}
                  />
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#19a7ce',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 8,
                      marginTop: 5,
                    }}
                    onPress={handleDocumentSelection}>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        color: 'white',
                        paddingTop: 5,
                      }}>
                      Select Picture
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.ProfileContentWrapper}>
                <View>
                  <Text style={styles.ProfileContentHeader}>Name</Text>
                  <View style={styles.ProfileValueWrapper}>
                    {!editName && <Text style={styles.FontStyle}>Fahmi</Text>}
                    {!editName && (
                      <Text
                        onPress={() => setEditName(true)}
                        style={styles.EditBtnStyle}>
                        Edit
                      </Text>
                    )}
                    {editName && (
                      <TextInput
                        style={styles.ProfileNameInput}
                        onChangeText={handleChange('fullName')}
                        onBlur={handleBlur('fullName')}
                        value={values.fullName}></TextInput>
                    )}
                  </View>
                </View>
                <View>
                  <Text style={styles.ProfileContentHeader}>Username</Text>
                  <View style={styles.ProfileValueWrapper}>
                    {!editUsername && (
                      <Text style={styles.FontStyle}>@jhont0</Text>
                    )}
                    {!editUsername && (
                      <Text
                        onPress={() => setEditUsername(true)}
                        style={styles.EditBtnStyle}>
                        Edit
                      </Text>
                    )}
                    {editUsername && (
                      <TextInput
                        style={styles.ProfileNameInput}
                        onChangeText={handleChange('username')}
                        onBlur={handleBlur('username')}
                        value={values.username}></TextInput>
                    )}
                  </View>
                </View>
                <View>
                  <Text style={styles.ProfileContentHeader}>Email</Text>
                  <View style={styles.ProfileValueWrapper}>
                    {!editEmail && (
                      <Text style={styles.FontStyle}>jhont0@gmail.com</Text>
                    )}
                    {!editEmail && (
                      <Text
                        onPress={() => setEditEmail(true)}
                        style={styles.EditBtnStyle}>
                        Edit
                      </Text>
                    )}
                    {editEmail && (
                      <TextInput
                        style={styles.ProfileNameInput}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}></TextInput>
                    )}
                  </View>
                </View>
                <View>
                  <Text style={styles.ProfileContentHeader}>Phone Number</Text>
                  <View style={styles.ProfileValueWrapper}>
                    {!editPhoneNumber && (
                      <Text style={styles.FontStyle}>+62812345678</Text>
                    )}
                    {!editPhoneNumber && (
                      <Text
                        onPress={() => setEditPhoneNumber(true)}
                        style={styles.EditBtnStyle}>
                        Edit
                      </Text>
                    )}
                    {editPhoneNumber && (
                      <TextInput
                        style={styles.ProfileNameInput}
                        onChangeText={handleChange('phoneNumber')}
                        onBlur={handleBlur('phoneNumber')}
                        value={values.phoneNumber}></TextInput>
                    )}
                  </View>
                </View>
                <View>
                  <Text style={styles.ProfileContentHeader}>Gender</Text>
                  <View style={styles.GenderWrapperStyle}>
                    <View style={styles.RadioWrapperStyle}>
                      <RadioButton
                        value="first"
                        status={checked1 ? 'checked' : 'unchecked'}
                        onPress={function () {
                          setChecked1(!checked1);
                          setChecked2(false);
                        }}
                      />
                      <Text
                        onPress={function () {
                          setChecked1(!checked1);
                          setChecked2(false);
                        }}
                        style={styles.FontStyle}>
                        Male
                      </Text>
                    </View>
                    <View style={styles.RadioWrapperStyle}>
                      <RadioButton
                        value="first"
                        status={checked2 ? 'checked' : 'unchecked'}
                        onPress={function () {
                          setChecked2(!checked2);
                          setChecked1(false);
                        }}
                      />
                      <Text
                        onPress={function () {
                          setChecked2(!checked2);
                          setChecked1(false);
                        }}
                        style={styles.FontStyle}>
                        Female
                      </Text>
                    </View>
                  </View>
                </View>
                <View>
                  <Text style={styles.ProfileContentHeader}>
                    Select Profession
                  </Text>
                  <SelectDropdown
                    data={profession}
                    buttonStyle={styles.SelectDropdownStyle}
                    onSelect={(selectedItem, index) => {
                      setProf(selectedItem);
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                      return item;
                    }}
                  />
                </View>
                <View>
                  <Text style={styles.ProfileContentHeader}>
                    Select Nationality
                  </Text>
                  <SelectDropdown
                    data={nationality}
                    buttonStyle={styles.SelectDropdownStyle}
                    onSelect={(selectedItem, index) => {
                      setNation(selectedItem);
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                      return item;
                    }}
                  />
                </View>
                <View>
                  <Text style={styles.ProfileContentHeader}>Date</Text>
                  <View>
                    <View style={styles.BirthDateWrapper}>
                      <View style={styles.DateWrapper}>
                        <Text style={styles.FontStyle}>
                          {moment(date).format('d')} /
                        </Text>
                        <Text style={styles.FontStyle}>
                          {moment(date).format('m')} /
                        </Text>
                        <Text style={styles.FontStyle}>
                          {moment(date).format('y')}
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={styles.EditBtnStyle}
                          onPress={() => setOpen(true)}>
                          Edit
                        </Text>
                      </View>
                    </View>
                    <DatePicker
                      modal
                      open={open}
                      date={date}
                      onConfirm={date => {
                        setOpen(false);
                        setDate(date);
                      }}
                      onCancel={() => {
                        setOpen(false);
                      }}
                    />
                  </View>
                </View>
                <View>
                  <TouchableOpacity style={styles.SaveBtnStyle}>
                    <Text onPress={handleSubmit} style={styles.SaveTextStyle}>
                      Save
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          );
        }}
      </Formik>
    </ScrollView>
  );
};

export default Profile;
