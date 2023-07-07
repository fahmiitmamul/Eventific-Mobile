import {ScrollView, View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Appbar} from 'react-native-paper';
import styles from '../styles/global';
import HamburgerIcon from '../assets/images/hamburger.png';
import {Formik} from 'formik';
import {TextInput} from 'react-native-gesture-handler';
import {
  faChevronUp,
  faChevronDown,
  faCalendar,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import SelectDropdown from 'react-native-select-dropdown';
import http from '../helpers/http';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import {launchImageLibrary} from 'react-native-image-picker';
import {useSelector} from 'react-redux';
import {Modal} from 'react-native';
import SimpleLottie from '../components/LottieAnimation';
import {useFocusEffect} from '@react-navigation/native';
import {Image} from 'react-native';

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
        setEvents(data.results);
      }

      getEvents();
    }, []),
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

    if (selectedCategory == 0) {
      form.append('categoryId', 1);
    } else {
      form.append('categoryId', selectedCategory);
    }

    if (selectedLocation == 0) {
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
    <ScrollView
      style={{width: '100%', height: '100%', backgroundColor: 'white'}}>
      <Appbar.Header style={styles.ScrollViewStyle}>
        <Appbar.Action
          color="black"
          icon={HamburgerIcon}
          onPress={() => {
            navigation.openDrawer();
          }}
        />
        <Appbar.Content
          titleStyle={{fontFamily: 'Poppins-Medium', paddingLeft: 70}}
          title="Update Event"
        />
      </Appbar.Header>
      <View>
        <Formik
          initialValues={{
            title: events.title,
            description: events.description,
          }}
          onSubmit={doUpdate}>
          {({values, handleBlur, handleChange, handleSubmit}) => {
            return (
              <View style={{margin: 30}}>
                <View>
                  <Text style={{fontFamily: 'Poppins-Medium', marginBottom: 5}}>
                    Name
                  </Text>
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
                        value={values.title}></TextInput>
                    )}
                  </View>
                </View>
                <View>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Medium',
                      marginBottom: 5,
                      marginTop: 5,
                    }}>
                    Category
                  </Text>
                  <View style={styles.ProfileValueWrapper}>
                    {!editCategory && (
                      <Text style={styles.FontStyle}>{events?.category}</Text>
                    )}
                    {!editCategory && (
                      <Text
                        onPress={() => (a = setEditCategory(true))}
                        style={styles.EditBtnStyle}>
                        Edit
                      </Text>
                    )}
                    {editCategory && (
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
                  <Text
                    style={{
                      fontFamily: 'Poppins-Medium',
                      marginBottom: 5,
                      marginTop: 5,
                    }}>
                    Location
                  </Text>
                  <View style={styles.ProfileValueWrapper}>
                    {!editLocation && (
                      <Text style={styles.FontStyle}>{events?.location}</Text>
                    )}
                    {!editLocation && (
                      <Text
                        onPress={() => (a = setEditLocation(true))}
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
                        {moment(events.date).format('LLL')}
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
                    <Text style={styles.FontStyle}>{events?.description}</Text>
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
    </ScrollView>
  );
};

export default UpdateEvent;
