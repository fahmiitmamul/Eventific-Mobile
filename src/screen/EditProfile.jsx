import {
  View,
  Image,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Appbar, RadioButton} from 'react-native-paper';
import React from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Formik} from 'formik';
import {useSelector} from 'react-redux';
import http from '../helpers/http';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCamera,
  faChevronDown,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons';
import {Modal} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import styles from '../styles/global';
import HamburgerIcon from '../assets/images/hamburger.png';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import SimpleLottie from '../components/LottieAnimation';

const EditProfile = ({navigation}) => {
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
  const [editGender, setEditGender] = React.useState(false);
  const [profile, setProfile] = React.useState([]);
  const [prof, setProf] = React.useState('');
  const [nation, setNation] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);
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

  const editProfile = async values => {
    setModalVisible(true);
    const form = new FormData();

    Object.keys(values).forEach(key => {
      if (values[key]) {
        form.append(key, values[key]);
      }
    });

    const fileImage = {
      uri: fileResponse,
      type: 'image/jpeg',
      name: 'image' + '-' + Date.now() + '.jpg',
    };

    if (fileResponse.length > 1) {
      form.append('picture', fileImage);
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
    setEditGender(false);
    getProfile();
    setFileResponse([]);
    setModalVisible(false);
  };

  const profession = [
    'Web Developer',
    'Network Engineer',
    'Database Administrator',
  ];
  const nationality = ['Indonesia', 'Malaysia', 'Singapore', 'Vietnam'];

  const handleDocumentSelection = React.useCallback(async () => {
    try {
      const response = await launchImageLibrary({
        presentationStyle: 'fullScreen',
      });

      setFileResponse(response.assets[0].uri);
    } catch (err) {
      console.warn(err);
    }
  }, []);

  const handleCameraSelection = React.useCallback(async () => {
    try {
      const response = await launchCamera({
        presentationStyle: 'fullScreen',
      });

      setFileResponse(response.assets[0].uri);
    } catch (err) {
      console.warn(err);
    }
  }, []);

  return (
    <ScrollView style={styles.ContentWrapper}>
      <Appbar.Header style={styles.ManageHeaderStyle}>
        <Appbar.Action
          color="white"
          icon={HamburgerIcon}
          onPress={() => {
            navigation.openDrawer();
          }}
        />
        <Appbar.Content titleStyle={styles.AppbarProfile} title="Profile" />
      </Appbar.Header>
      <View style={styles.MainEventsWrapper}>
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
          {({values, handleBlur, handleChange, handleSubmit}) => {
            return (
              <>
                {!loading ? (
                  <View style={styles.SkeletonHeight}>
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
                        <View style={styles.DocumentSelectWrapper}>
                          <TouchableOpacity
                            style={styles.SelectPictureStyle}
                            onPress={handleDocumentSelection}>
                            <Text style={styles.SelectPictureTextStyle}>
                              Select Picture
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.CameraBtnStyle}
                            onPress={handleCameraSelection}>
                            <FontAwesomeIcon icon={faCamera} color="white" />
                          </TouchableOpacity>
                        </View>
                      </View>
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
                          flexDirection="row"
                          gap={10}
                          marginTop={5}>
                          <SkeletonPlaceholder.Item width={120} height={30} />
                          <SkeletonPlaceholder.Item width={50} height={30} />
                        </SkeletonPlaceholder.Item>
                      </SkeletonPlaceholder.Item>
                    </SkeletonPlaceholder>
                  </View>
                )}
                <View style={styles.ProfileContentWrapper}>
                  <View>
                    <Text style={styles.ProfileContentHeader}>Name</Text>
                    <View style={styles.ProfileValueWrapper}>
                      {!editName && (
                        <Text style={styles.FontStyle}>
                          {profile?.fullName}
                        </Text>
                      )}
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
                          value={values.fullName}
                        />
                      )}
                    </View>
                  </View>
                  <View>
                    <Text style={styles.ProfileContentHeader}>Username</Text>
                    <View style={styles.ProfileValueWrapper}>
                      {!editUsername && (
                        <Text style={styles.FontStyle}>
                          {profile?.username}
                        </Text>
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
                          value={values.username}
                        />
                      )}
                    </View>
                  </View>
                  <View>
                    <Text style={styles.ProfileContentHeader}>Email</Text>
                    <View style={styles.ProfileValueWrapper}>
                      {!editEmail && (
                        <Text style={styles.FontStyle}>{profile?.email}</Text>
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
                          value={values.email}
                        />
                      )}
                    </View>
                  </View>
                  <View>
                    <Text style={styles.ProfileContentHeader}>
                      Phone Number
                    </Text>
                    <View style={styles.ProfileValueWrapper}>
                      {!editPhoneNumber && (
                        <Text style={styles.FontStyle}>
                          {profile?.phoneNumber === null ? (
                            <Text>Not Set</Text>
                          ) : (
                            profile?.phoneNumber
                          )}
                        </Text>
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
                          value={values.phoneNumber}
                        />
                      )}
                    </View>
                  </View>
                  <View>
                    <Text style={styles.ProfileContentHeader}>Gender</Text>
                    <View style={styles.GenderWrapperStyle}>
                      {editGender && (
                        <>
                          <View style={styles.RadioWrapperStyle}>
                            <RadioButton
                              value="1"
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
                              value="0"
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
                        </>
                      )}
                      {!editGender && (
                        <>
                          <View style={styles.RadioWrapperStyle}>
                            <Text style={styles.FontStyle}>
                              {profile?.gender === true ? 'Male' : 'Female'}
                            </Text>
                          </View>
                        </>
                      )}
                      <Text
                        onPress={() => setEditGender(true)}
                        style={styles.EditGenderTextStyle}>
                        Edit
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Text style={styles.ProfileContentHeader}>
                      Select Profession
                    </Text>
                    <SelectDropdown
                      data={profession}
                      defaultButtonText={profile?.profession}
                      dropdownStyle={styles.DropdownStyle}
                      buttonStyle={styles.SelectDropdownStyle}
                      buttonTextStyle={styles.ProfileDropdownBtn}
                      rowStyle={styles.DropdownRowStyle}
                      rowTextStyle={styles.DropdownRowTextStyle}
                      renderDropdownIcon={isOpened => {
                        return (
                          <FontAwesomeIcon
                            icon={isOpened ? faChevronUp : faChevronDown}
                            color={'#444'}
                            size={18}
                          />
                        );
                      }}
                      onSelect={selectedItem => {
                        setProf(selectedItem);
                      }}
                      buttonTextAfterSelection={selectedItem => {
                        return selectedItem;
                      }}
                      rowTextForSelection={item => {
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
                      defaultButtonText={profile?.nationality}
                      dropdownStyle={styles.DropdownStyle}
                      buttonTextStyle={styles.DropdownRowTextStyle}
                      rowStyle={styles.DropdownRowStyle}
                      rowTextStyle={styles.DropdownRowTextStyle}
                      renderDropdownIcon={isOpened => {
                        return (
                          <FontAwesomeIcon
                            icon={isOpened ? faChevronUp : faChevronDown}
                            color={'#444'}
                            size={18}
                          />
                        );
                      }}
                      buttonStyle={styles.SelectDropdownStyle}
                      onSelect={selectedItem => {
                        setNation(selectedItem);
                      }}
                      buttonTextAfterSelection={selectedItem => {
                        return selectedItem;
                      }}
                      rowTextForSelection={item => {
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
                            {profile?.birthDate === null ? (
                              <Text style={styles.FontStyle}>Not Set</Text>
                            ) : (
                              moment(profile?.birthDate).format('DD/MM/YYYY')
                            )}
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
                        mode="date"
                        date={date}
                        onConfirm={dates => {
                          setOpen(false);
                          setDate(dates);
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
      </View>
      <Modal
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.ModalStyle}>
          <SimpleLottie />
        </View>
      </Modal>
    </ScrollView>
  );
};

export default EditProfile;
