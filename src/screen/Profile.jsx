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

const Profile = () => {
  const [checked2, setChecked2] = React.useState(false);
  const [checked1, setChecked1] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(new Date());

  const profession = [
    'Web Developer',
    'Network Engineer',
    'Database Administrator',
  ];
  const nationality = ['Egypt', 'Canada', 'Australia', 'Ireland'];

  return (
    <ScrollView style={styles.ContentWrapper}>
      <Appbar.Header style={styles.ManageHeaderStyle}>
        <Appbar.BackAction onPress={() => {}} />
        <Appbar.Content titleStyle={styles.FontStyle} title="Profile" />
      </Appbar.Header>
      <View style={styles.PictureWrapper}>
        <View style={styles.PictureChildWrapper}>
          <Image
            style={styles.ImageStyle}
            source={require('../assets/images/profilephoto.jpg')}
          />
        </View>
      </View>
      <View style={styles.ProfileContentWrapper}>
        <View>
          <Text style={styles.ProfileContentHeader}>Name</Text>
          <TextInput style={styles.ProfileNameInput}></TextInput>
        </View>
        <View>
          <Text style={styles.ProfileContentHeader}>Username</Text>
          <View style={styles.ProfileValueWrapper}>
            <Text style={styles.FontStyle}>@jhont0</Text>
            <Text style={styles.EditBtnStyle}>Edit</Text>
          </View>
        </View>
        <View>
          <Text style={styles.ProfileContentHeader}>Email</Text>
          <View style={styles.ProfileValueWrapper}>
            <Text style={styles.FontStyle}>jhont0@mail.com</Text>
            <Text style={styles.EditBtnStyle}>Edit</Text>
          </View>
        </View>
        <View>
          <Text style={styles.ProfileContentHeader}>Phone</Text>
          <View style={styles.ProfileValueWrapper}>
            <Text style={styles.FontStyle}>+62812345678</Text>
            <Text style={styles.EditBtnStyle}>Edit</Text>
          </View>
        </View>
        <View>
          <Text style={styles.ProfileContentHeader}>Gender</Text>
          <View style={styles.GenderWrapperStyle}>
            <View style={styles.RadioWrapperStyle}>
              <RadioButton
                value="first"
                status={checked1 ? 'checked' : 'unchecked'}
                onPress={() => setChecked1(!checked1)}
              />
              <Text>Male</Text>
            </View>
            <View style={styles.RadioWrapperStyle}>
              <RadioButton
                value="first"
                status={checked2 ? 'checked' : 'unchecked'}
                onPress={() => setChecked2(!checked2)}
              />
              <Text>Female</Text>
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.ProfileContentHeader}>Select Profession</Text>
          <SelectDropdown
            data={profession}
            buttonStyle={styles.SelectDropdownStyle}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
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
          <Text style={styles.ProfileContentHeader}>Select Nationality</Text>
          <SelectDropdown
            data={nationality}
            buttonStyle={styles.SelectDropdownStyle}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
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
                <Text style={styles.FontStyle}>{moment(date).format('y')}</Text>
              </View>
              <View>
                <Text style={styles.EditBtnStyle} onPress={() => setOpen(true)}>
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
            <Text style={styles.SaveTextStyle}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;
