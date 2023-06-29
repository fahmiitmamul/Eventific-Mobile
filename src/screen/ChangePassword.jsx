import React from 'react';
import {ScrollView, Text, TextInput, View, StyleSheet} from 'react-native';
import {Formik} from 'formik';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import {Button} from 'react-native-paper';
import {Appbar} from 'react-native-paper';
import * as Yup from 'yup';
import HamburgerIcon from '../assets/images/hamburger.png';
import styles from '../styles/global';

const validationSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is Required'),
  newPassword: Yup.string()
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is Required'),
  confirmPassword: Yup.string()
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Confirm Password is required'),
});

const ChangePassword = ({navigation}) => {
  const [openPassword, setOpenPassword] = React.useState(false);
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [openOld, setOpenOld] = React.useState(false);

  function Passwords() {
    setOpenOld(!openOld);
  }

  function Password() {
    setOpenPassword(!openPassword);
  }

  function Confirm() {
    setOpenConfirm(!openConfirm);
  }

  return (
    <React.Fragment>
      <Appbar.Header style={styles.ScrollViewStyle}>
        <Appbar.Action
          color="black"
          icon={HamburgerIcon}
          onPress={() => {
            navigation.openDrawer();
          }}
        />
        <Appbar.Content
          titleStyle={styles.ManageHeaderStyle}
          title="Change Password"
        />
      </Appbar.Header>
      <ScrollView style={styles.ScrollViewStyle}>
        <View style={styles.ChangePassFormWrapper}>
          <Formik
            initialValues={{
              oldPassword: '',
              newPassword: '',
              confirmPassword: '',
            }}
            validationSchema={validationSchema}
            onSubmit={values => console.log(values)}>
            {({values, errors, handleBlur, handleChange, touched}) => {
              return (
                <View>
                  <View style={styles.FormWrapperStyle}>
                    <View style={{position: 'relative'}}>
                      {errors.oldPassword && touched.oldPassword ? (
                        <TextInput
                          placeholder="Old Password"
                          onChangeText={handleChange('oldPassword')}
                          onBlur={handleBlur('oldPassword')}
                          value={values.oldPassword}
                          style={styles.FormTextInputErrorStyle}></TextInput>
                      ) : (
                        <TextInput
                          placeholder="Old Password"
                          onChangeText={handleChange('oldPassword')}
                          onBlur={handleBlur('oldPassword')}
                          value={values.oldPassword}
                          style={styles.FormTextInputNormalStyle}></TextInput>
                      )}
                      {errors.oldPassword && touched.oldPassword && (
                        <Text style={styles.FormTextErrorStyle}>
                          {errors.oldPassword}
                        </Text>
                      )}
                      <Text style={styles.EyeButtonStyle} onPress={Passwords}>
                        <FontAwesomeIcon
                          icon={openOld ? faEyeSlash : faEye}
                          size={30}></FontAwesomeIcon>
                      </Text>
                    </View>
                    <View style={styles.PasswordWrapperStyle}>
                      <View>
                        {errors.newPassword && touched.newPassword ? (
                          <TextInput
                            placeholder="New Password"
                            onChangeText={handleChange('newPassword')}
                            onBlur={handleBlur('newPassword')}
                            value={values.newPassword}
                            secureTextEntry={openPassword ? true : false}
                            style={styles.FormTextInputErrorStyle}></TextInput>
                        ) : (
                          <TextInput
                            placeholder="New Password"
                            onChangeText={handleChange('newPassword')}
                            onBlur={handleBlur('newPassword')}
                            value={values.newPassword}
                            secureTextEntry={openPassword ? true : false}
                            style={styles.FormTextInputNormalStyle}></TextInput>
                        )}
                        {errors.newPassword && touched.newPassword && (
                          <Text style={styles.FormTextErrorStyle}>
                            {errors.newPassword}
                          </Text>
                        )}
                      </View>
                      <Text style={styles.EyeButtonStyle} onPress={Password}>
                        <FontAwesomeIcon
                          icon={openPassword ? faEyeSlash : faEye}
                          size={30}></FontAwesomeIcon>
                      </Text>
                    </View>
                    <View style={styles.PasswordWrapperStyle}>
                      <View>
                        {errors.confirmPassword && touched.confirmPassword ? (
                          <TextInput
                            placeholder="Confirm Password"
                            onChangeText={handleChange('confirmPassword')}
                            onBlur={handleBlur('confirmPassword')}
                            value={values.confirmPassword}
                            secureTextEntry={openConfirm ? true : false}
                            style={styles.FormTextInputErrorStyle}></TextInput>
                        ) : (
                          <TextInput
                            placeholder="Confirm Password"
                            onChangeText={handleChange('confirmPassword')}
                            onBlur={handleBlur('confirmPassword')}
                            value={values.confirmPassword}
                            secureTextEntry={openConfirm ? true : false}
                            style={styles.FormTextInputNormalStyle}></TextInput>
                        )}
                        {errors.confirmPassword && touched.confirmPassword && (
                          <Text style={styles.FormTextErrorStyle}>
                            {errors.confirmPassword}
                          </Text>
                        )}
                      </View>
                      <Text style={styles.EyeButtonStyle} onPress={Confirm}>
                        <FontAwesomeIcon
                          icon={openConfirm ? faEyeSlash : faEye}
                          size={30}></FontAwesomeIcon>
                      </Text>
                    </View>
                  </View>
                  <View style={styles.BtnWrapperStyle}>
                    <Button
                      mode="contained"
                      onPress={() => navigation.navigate('ChangePassword')}>
                      <Text style={styles.FontStyle}>Update</Text>
                    </Button>
                  </View>
                </View>
              );
            }}
          </Formik>
        </View>
      </ScrollView>
    </React.Fragment>
  );
};

export default ChangePassword;
