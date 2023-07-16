import React from 'react';
import * as Yup from 'yup';
import styles from '../styles/global';
import http from '../helpers/http';
import {Text, TextInput, View} from 'react-native';
import {Formik} from 'formik';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import {Button} from 'react-native-paper';
import {Appbar} from 'react-native-paper';
import {useSelector} from 'react-redux';

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
  const [successMsg, setSuccessMsg] = React.useState('');
  const [errorMsg, setErrorMsg] = React.useState('');
  const token = useSelector(state => state.auth.token);

  function Passwords() {
    setOpenOld(!openOld);
  }

  function Password() {
    setOpenPassword(!openPassword);
  }

  function Confirm() {
    setOpenConfirm(!openConfirm);
  }

  if (successMsg || errorMsg) {
    setTimeout(() => {
      setSuccessMsg(false);
      setErrorMsg(false);
    }, 3000);
  }

  const doChange = async function (values) {
    const {oldPassword, newPassword, confirmPassword} = values;
    const form = new URLSearchParams({
      oldPassword,
      newPassword,
      confirmPassword,
    }).toString();
    try {
      const {data} = await http(token).post('/changepassword', form);
      setSuccessMsg(data.message);
    } catch (err) {
      const message = err?.response?.data?.message;
      setErrorMsg(message);
    }
  };

  return (
    <View style={styles.ChangePasswordWrapper}>
      <Appbar.Header style={styles.ScrollViewStyle}>
        <Appbar.BackAction
          onPress={() => {
            navigation.navigate('Profile');
          }}
          color="white"
        />
        <Appbar.Content
          titleStyle={styles.ManageHeaderStyle}
          title="Change Password"
        />
      </Appbar.Header>
      <View style={styles.ScrollViewStyle}>
        <View style={styles.ChangePasswordSecondWrapper}>
          <View style={styles.ChangePassFormWrapper}>
            {successMsg && (
              <View style={styles.FormErrorViewStyle}>
                <Text style={styles.FormSuccessTextStyle}>{successMsg}</Text>
              </View>
            )}
            {errorMsg && (
              <View style={styles.FormErrorViewStyle}>
                <Text style={styles.FormErrorTextStyle}>{errorMsg}</Text>
              </View>
            )}
            <Formik
              initialValues={{
                oldPassword: '',
                newPassword: '',
                confirmPassword: '',
              }}
              validationSchema={validationSchema}
              onSubmit={doChange}>
              {({
                values,
                errors,
                handleBlur,
                handleChange,
                touched,
                handleSubmit,
              }) => {
                return (
                  <View>
                    <View style={styles.FormWrapperStyle}>
                      <View style={styles.Relative}>
                        {errors.oldPassword && touched.oldPassword ? (
                          <TextInput
                            placeholder="Old Password"
                            onChangeText={handleChange('oldPassword')}
                            onBlur={handleBlur('oldPassword')}
                            value={values.oldPassword}
                            style={styles.FormTextInputErrorStyle}
                          />
                        ) : (
                          <TextInput
                            placeholder="Old Password"
                            onChangeText={handleChange('oldPassword')}
                            onBlur={handleBlur('oldPassword')}
                            value={values.oldPassword}
                            style={styles.FormTextInputNormalStyle}
                          />
                        )}
                        {errors.oldPassword && touched.oldPassword && (
                          <Text style={styles.FormTextErrorStyle}>
                            {errors.oldPassword}
                          </Text>
                        )}
                        <Text style={styles.EyeButtonStyle} onPress={Passwords}>
                          <FontAwesomeIcon
                            icon={openOld ? faEyeSlash : faEye}
                            size={30}
                          />
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
                              style={styles.FormTextInputErrorStyle}
                            />
                          ) : (
                            <TextInput
                              placeholder="New Password"
                              onChangeText={handleChange('newPassword')}
                              onBlur={handleBlur('newPassword')}
                              value={values.newPassword}
                              secureTextEntry={openPassword ? true : false}
                              style={styles.FormTextInputNormalStyle}
                            />
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
                            size={30}
                          />
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
                              style={styles.FormTextInputErrorStyle}
                            />
                          ) : (
                            <TextInput
                              placeholder="Confirm Password"
                              onChangeText={handleChange('confirmPassword')}
                              onBlur={handleBlur('confirmPassword')}
                              value={values.confirmPassword}
                              secureTextEntry={openConfirm ? true : false}
                              style={styles.FormTextInputNormalStyle}
                            />
                          )}
                          {errors.confirmPassword &&
                            touched.confirmPassword && (
                              <Text style={styles.FormTextErrorStyle}>
                                {errors.confirmPassword}
                              </Text>
                            )}
                        </View>
                        <Text style={styles.EyeButtonStyle} onPress={Confirm}>
                          <FontAwesomeIcon
                            icon={openConfirm ? faEyeSlash : faEye}
                            size={30}
                          />
                        </Text>
                      </View>
                    </View>
                    <View style={styles.BtnWrapperStyle}>
                      <Button mode="contained" onPress={handleSubmit}>
                        <Text style={styles.FontStyle}>Update</Text>
                      </Button>
                    </View>
                  </View>
                );
              }}
            </Formik>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ChangePassword;
