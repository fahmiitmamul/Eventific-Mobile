import styles from '../styles/global';
import SelectDropdown from 'react-native-select-dropdown';
import http from '../helpers/http';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import SimpleLottie from '../components/LottieAnimation';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {launchImageLibrary} from 'react-native-image-picker';
import {useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Modal} from 'react-native';
import {Formik} from 'formik';
import {TextInput} from 'react-native-gesture-handler';
import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Appbar} from 'react-native-paper';
import {
  faChevronUp,
  faChevronDown,
  faCalendar,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';

const CreateEvent = ({navigation}) => {
  const [category, setCategory] = React.useState([]);
  const [city, setCity] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState('');
  const [selectedLocation, setSelectedLocation] = React.useState('');
  const [date, setDate] = React.useState(new Date());
  const [open, setOpen] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [fileResponse, setFileResponse] = React.useState([]);
  const categoriesName = [];
  const locationName = [];
  const token = useSelector(state => state.auth.token);

  category.map(c => {
    categoriesName.push(c.name);
  });

  city.map(ci => {
    locationName.push(ci.name);
  });

  React.useEffect(() => {
    async function getCategory() {
      try {
        const {data} = await http().get('/categories?limit=7');
        setCategory(data.results);
      } catch (err) {
        console.warn(err);
      }
    }

    async function getLocation() {
      try {
        const {data} = await http().get('/cities');
        setCity(data.results);
      } catch (err) {
        console.warn(err);
      }
    }

    getCategory();
    getLocation();
  }, []);

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

  const doCreate = async values => {
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

    if (selectedCategory === 0) {
      form.append('categoryId', 1);
    } else {
      form.append('categoryId', selectedCategory);
    }

    if (selectedLocation === 0) {
      form.append('cityId', 1);
    } else {
      form.append('cityId', selectedLocation);
    }

    if (date) {
      form.append('date', moment(date).format('YYYY-MM-DD'));
    }

    if (fileResponse) {
      form.append('picture', fileImage);
    }

    try {
      const {data} = await http(token).post('/events/manage', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (data.success === true) {
        navigation.navigate('Manage Event');
      }
    } catch (err) {
      console.warn(err);
    }
    setModalVisible(false);
  };

  return (
    <KeyboardAwareScrollView style={styles.CreateEventWrapper} enableOnAndroid>
      <Appbar.Header style={styles.ScrollViewStyle}>
        <Appbar.BackAction
          onPress={() => {
            navigation.navigate('Manage Event');
          }}
          color="white"
        />
        <Appbar.Content
          titleStyle={styles.CreateEventAppbar}
          title="Create Event"
        />
      </Appbar.Header>
      <View style={styles.ContentWrapperStyle}>
        <Formik
          initialValues={{title: '', description: ''}}
          onSubmit={doCreate}>
          {({values, handleBlur, handleChange, handleSubmit}) => {
            return (
              <View style={styles.CreateEventForm}>
                <View>
                  <Text style={styles.InputEventStyle}>Name</Text>
                  <TextInput
                    style={styles.ProfileNameInput}
                    placeholder="Input name event..."
                    onChangeText={handleChange('title')}
                    onBlur={handleBlur('title')}
                    value={values.title}
                  />
                </View>
                <View>
                  <Text style={styles.CategoryTextStyle}>Category</Text>
                  <SelectDropdown
                    data={categoriesName}
                    defaultButtonText="Category"
                    dropdownStyle={styles.DropdownStyle}
                    buttonStyle={styles.SelectDropdownStyle}
                    buttonTextStyle={styles.CategoriesDropdown}
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
                    onSelect={(selectedItem, index) => {
                      setSelectedCategory(index);
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem;
                    }}
                    rowTextForSelection={item => {
                      return item;
                    }}
                  />
                </View>
                <View>
                  <Text style={styles.CategoryTextStyle}>Location</Text>
                  <SelectDropdown
                    data={locationName}
                    defaultButtonText="Location"
                    dropdownStyle={styles.DropdownStyle}
                    buttonStyle={styles.SelectDropdownStyle}
                    buttonTextStyle={styles.CategoriesDropdown}
                    rowStyle={styles.DropdownRowStyle}
                    rowTextStyle={styles.DropdownRowStyle}
                    renderDropdownIcon={isOpened => {
                      return (
                        <FontAwesomeIcon
                          icon={isOpened ? faChevronUp : faChevronDown}
                          color={'#444'}
                          size={18}
                        />
                      );
                    }}
                    onSelect={(selectedItem, index) => {
                      setSelectedLocation(index);
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem;
                    }}
                    rowTextForSelection={item => {
                      return item;
                    }}
                  />
                </View>
                <View>
                  <Text style={styles.DateTextStyle}>Date Time Show</Text>
                  <TouchableOpacity
                    style={styles.DateWrapperStyle}
                    onPress={() => setOpen(true)}>
                    <Text style={styles.PoppinsMedium}>
                      {moment(date).format('DD/MM/YYYY')}
                    </Text>
                    <FontAwesomeIcon icon={faCalendar} />
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
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={handleDocumentSelection}>
                  <Text style={styles.SelectPictureTextStyle}>
                    Select Picture
                  </Text>
                  <View style={styles.DateWrapperStyle}>
                    <Text style={styles.PoppinsMedium}>Choose File</Text>
                    <FontAwesomeIcon icon={faUpload} />
                  </View>
                </TouchableOpacity>
                <View>
                  <Text style={styles.SelectPictureTextStyle}>Description</Text>
                  <View style={styles.DescriptionStyle}>
                    <TextInput
                      style={styles.PoppinsRegular}
                      placeholder="Description"
                      onChangeText={handleChange('description')}
                      onBlur={handleBlur('description')}
                      value={values.description}
                    />
                  </View>
                </View>
                <View style={styles.CreateEventBtnStyle}>
                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={styles.SaveBtnStyle}>
                    <Text style={styles.SaveTextStyle}>Create Event</Text>
                  </TouchableOpacity>
                </View>
              </View>
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
    </KeyboardAwareScrollView>
  );
};

export default CreateEvent;
