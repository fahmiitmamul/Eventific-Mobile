import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import http from '../helpers/http';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import styles from '../styles/global';
import {launchImageLibrary} from 'react-native-image-picker';
import {useSelector} from 'react-redux';
import {Modal} from 'react-native';
import SimpleLottie from '../components/LottieAnimation';
import {useFocusEffect} from '@react-navigation/native';
import {Image} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faChevronUp,
  faChevronDown,
  faCalendar,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';
import {View, Text, TouchableOpacity} from 'react-native';
import {Appbar} from 'react-native-paper';
import {Formik} from 'formik';
import {TextInput} from 'react-native-gesture-handler';

const UpdateEvent = ({route, navigation}) => {
  const [category, setCategory] = React.useState([]);
  const [city, setCity] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState('');
  const [selectedLocation, setSelectedLocation] = React.useState('');
  const [date, setDate] = React.useState(new Date());
  const [open, setOpen] = React.useState(false);
  const [fileResponse, setFileResponse] = React.useState([]);
  const [editTitle, setEditTitle] = React.useState(false);
  const [editCategory, setEditCategory] = React.useState(false);
  const [editLocation, setEditLocation] = React.useState(false);
  const [editPicture, setEditPicture] = React.useState(false);
  const [editDescription, setEditDescription] = React.useState(false);
  const [editDate, setEditDate] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [events, setEvents] = React.useState([]);
  const categoriesName = [];
  const locationName = [];
  const token = useSelector(state => state.auth.token);
  const {eventId} = route.params;

  useFocusEffect(
    React.useCallback(() => {
      async function getEvents() {
        const {data} = await http(token).get(`/events/${eventId}`);
        setEvents(data.results.rows);
      }

      getEvents();
      return () => {
        setEditCategory(false);
        setEditDate(false);
        setEditDescription(false);
        setEditLocation(false);
        setEditPicture(false);
        setEditTitle(false);
      };
    }, [eventId, token]),
  );

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

  const doUpdate = async values => {
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

    if (fileResponse.length > 1) {
      form.append('picture', fileImage);
    }

    try {
      const {data} = await http(token).patch(
        `/events/manage/${eventId}`,
        form,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      if (data.success === true) {
        navigation.navigate('Manage Event');
      }
    } catch (err) {
      console.warn(err);
    }
    setModalVisible(false);
    setEditTitle(false);
    setEditCategory(false);
    setEditLocation(false);
    setEditDate(false);
    setEditPicture(false);
    setEditDescription(false);
  };

  return (
    <KeyboardAwareScrollView enableOnAndroid>
      <View style={styles.CreateEventWrapper}>
        <Appbar.Header style={styles.ScrollViewStyle}>
          <Appbar.BackAction
            onPress={() => {
              navigation.navigate('Manage Event');
            }}
            color="white"
          />
          <Appbar.Content
            titleStyle={styles.CreateEventAppbar}
            title="Update Event"
          />
        </Appbar.Header>
        <View style={styles.ContentWrapperStyle}>
          <Formik
            initialValues={{
              title: events?.title,
              description: events?.description,
            }}
            onSubmit={doUpdate}>
            {({values, handleBlur, handleChange, handleSubmit}) => {
              return (
                <View style={styles.CreateEventForm}>
                  <View>
                    <Text style={styles.InputEventStyle}>Name</Text>
                    <View style={styles.ProfileValueWrapper}>
                      {!editTitle && (
                        <Text style={styles.FontStyle}>{events?.title}</Text>
                      )}
                      {!editTitle && (
                        <Text
                          onPress={() => setEditTitle(true)}
                          style={styles.EditBtnStyle}>
                          Edit
                        </Text>
                      )}
                      {editTitle && (
                        <TextInput
                          style={styles.ProfileNameInput}
                          onChangeText={handleChange('title')}
                          onBlur={handleBlur('title')}
                          value={values.title}
                        />
                      )}
                    </View>
                  </View>
                  <View>
                    <Text style={styles.CategoryTextStyle}>Category</Text>
                    <View style={styles.ProfileValueWrapper}>
                      {!editCategory && (
                        <Text style={styles.FontStyle}>{events?.category}</Text>
                      )}
                      {!editCategory && (
                        <Text
                          onPress={() => setEditCategory(true)}
                          style={styles.EditBtnStyle}>
                          Edit
                        </Text>
                      )}
                      {editCategory && (
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
                      )}
                    </View>
                  </View>
                  <View>
                    <Text style={styles.CategoryTextStyle}>Location</Text>
                    <View style={styles.ProfileValueWrapper}>
                      {!editLocation && (
                        <Text style={styles.FontStyle}>{events?.location}</Text>
                      )}
                      {!editLocation && (
                        <Text
                          onPress={() => setEditLocation(true)}
                          style={styles.EditBtnStyle}>
                          Edit
                        </Text>
                      )}
                      {editLocation && (
                        <SelectDropdown
                          data={categoriesName}
                          defaultButtonText="Category"
                          dropdownStyle={{backgroundColor: '#EFEFEF'}}
                          buttonStyle={styles.SelectDropdownStyle}
                          buttonTextStyle={{
                            textAlign: 'left',
                            fontFamily: 'Poppins-Medium',
                            color: 'gray',
                            fontSize: 16,
                            paddingTop: 3,
                          }}
                          rowStyle={{
                            backgroundColor: '#EFEFEF',
                            borderBottomColor: '#C5C5C5',
                          }}
                          rowTextStyle={{color: '#444', textAlign: 'left'}}
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
                      )}
                    </View>
                  </View>
                  <View>
                    <Text style={{fontFamily: 'Poppins-Medium', marginTop: 6}}>
                      Date Time Show
                    </Text>
                    <View style={styles.ProfileValueWrapper}>
                      {!editDate && (
                        <Text style={styles.FontStyle}>
                          {moment(events?.date).format('LLL')}
                        </Text>
                      )}
                      {!editDate && (
                        <Text
                          onPress={() => (a = setEditDate(true))}
                          style={styles.EditBtnStyle}>
                          Edit
                        </Text>
                      )}
                      {editDate && (
                        <TouchableOpacity
                          style={{
                            borderWidth: 1,
                            height: 50,
                            borderColor: '#9DB2BF',
                            borderRadius: 5,
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 15,
                            paddingVertical: 12,
                            width: '100%',
                          }}
                          onPress={() => setOpen(true)}>
                          <Text style={{fontFamily: 'Poppins-Medium'}}>
                            {moment(date).format('DD/MM/YYYY')}
                          </Text>
                          <FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon>
                          <DatePicker
                            modal
                            open={open}
                            mode="date"
                            date={date}
                            onConfirm={date => {
                              setOpen(false);
                              setDate(date);
                            }}
                            onCancel={() => {
                              setOpen(false);
                            }}
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                  <TouchableOpacity onPress={handleDocumentSelection}>
                    <Text style={{fontFamily: 'Poppins-Medium', marginTop: 6}}>
                      Select Picture
                    </Text>
                    <View style={styles.ProfileValueWrapper}>
                      {!editPicture && (
                        <Image
                          source={{
                            uri: `https://res.cloudinary.com/dxnewldiy/image/upload/v1683808473/${events?.picture}`,
                          }}
                          style={{width: 100, height: 150}}
                        />
                      )}
                      {!editPicture && (
                        <Text
                          onPress={() => (a = setEditPicture(true))}
                          style={styles.EditBtnStyle}>
                          Edit
                        </Text>
                      )}
                      {editPicture && (
                        <View
                          style={{
                            borderWidth: 1,
                            height: 50,
                            borderColor: '#9DB2BF',
                            borderRadius: 5,
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 15,
                            paddingVertical: 12,
                            width: '100%',
                          }}>
                          <Text style={{fontFamily: 'Poppins-Medium'}}>
                            Choose File
                          </Text>
                          <FontAwesomeIcon icon={faUpload}></FontAwesomeIcon>
                        </View>
                      )}
                    </View>
                  </TouchableOpacity>
                  <View>
                    <Text style={{fontFamily: 'Poppins-Medium', marginTop: 5}}>
                      Description
                    </Text>
                    {!editDescription && (
                      <Text style={styles.FontStyle}>
                        {events?.description}
                      </Text>
                    )}
                    {!editDescription && (
                      <Text
                        onPress={() => (a = setEditDescription(true))}
                        style={styles.EditBtnStyle}>
                        Edit
                      </Text>
                    )}
                    {editDescription && (
                      <View
                        style={{
                          borderWidth: 1,
                          borderRadius: 10,
                          paddingLeft: 10,
                          width: '100%',
                          borderColor: '#9DB2BF',
                          height: 200,
                        }}>
                        <TextInput
                          style={{fontFamily: 'Poppins-Regular'}}
                          placeholder="Description"
                          onChangeText={handleChange('description')}
                          onBlur={handleBlur('description')}
                          value={values.description}></TextInput>
                      </View>
                    )}
                  </View>
                  <View style={{marginTop: 10}}>
                    <TouchableOpacity
                      onPress={handleSubmit}
                      style={styles.SaveBtnStyle}>
                      <Text style={styles.SaveTextStyle}>Update Event</Text>
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
          <View
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 25,
              backgroundColor: 'white',
            }}>
            <SimpleLottie />
          </View>
        </Modal>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default UpdateEvent;
