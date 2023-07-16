import React from 'react';
import {ScrollView, Text, TextInput, View} from 'react-native';
import {Formik} from 'formik';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import {Button} from 'react-native-paper';
import * as Yup from 'yup';
import {Appbar} from 'react-native-paper';
import styles from '../styles/global';
import http from '../helpers/http';

const validationSchema = Yup.object().shape({
  code: Yup.string().required('Code is Required'),
  email: Yup.string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
  password: Yup.string()
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is Required'),
  confirmPassword: Yup.string()
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Confirm Password is required'),
});

const ResetPassword = ({navigation}) => {
  const [openPassword, setOpenPassword] = React.useState(false);
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [successMsg, setSuccessMsg] = React.useState('');
  const [errorMsg, setErrorMsg] = React.useState('');

  function Password() {
    setOpenPassword(!openPassword);
  }

  function Confirm() {
    setOpenConfirm(!openConfirm);
  }

  const doReset = async function (values) {
    const {code, email, password, confirmPassword} = values;
    const form = new URLSearchParams({
      code,
      email,
      password,
      confirmPassword,
    }).toString();
    try {
      const {data} = await http().post('/auth/reset-password', form);
      setSuccessMsg(data.message);
    } catch (err) {
      const errMsg = err.response?.data?.results[0].msg;
      setErrorMsg(errMsg);
    }
  };

  if (successMsg) {
    setTimeout(() => {
      navigation.navigate('SignIn');
    }, 3000);
  }

  React.useEffect(() => {
    setTimeout(() => {
      if (successMsg || errorMsg) {
        setErrorMsg(false);
        setSuccessMsg(false);
      }
    }, 3000);
  }, [errorMsg, successMsg]);

  return (
    <React.Fragment>
      <Appbar.Header style={styles.FlatListEmptyWrapper}>
        <Appbar.BackAction
          onPress={() => {
            navigation.navigate('ForgotPassword');
          }}
        />
      </Appbar.Header>
      <ScrollView style={styles.FlatListEmptyWrapper}>
        <View style={styles.ViewHeader}>
          <View>
            <Text style={styles.TextLoginStyle}>Reset Password</Text>
          </View>
          <View style={styles.SubtitleWrapper}>
            <Text style={styles.FontStyle}>
              Please enter code that we've already sent
            </Text>
          </View>
        </View>
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
        <View>
          <Formik
            initialValues={{
              code: '',
              email: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={validationSchema}
            onSubmit={doReset}>
            {({
              values,
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              touched,
              isValid,
            }) => {
              return (
                <View>
                  <View style={styles.FormWrapperStyle}>
                    <View>
                      {errors.code && touched.code ? (
                        <TextInput
                          placeholder="Code"
                          onChangeText={handleChange('code')}
                          onBlur={handleBlur('code')}
                          value={values.code}
                          style={styles.FormTextInputErrorStyle}
                        />
                      ) : (
                        <TextInput
                          placeholder="Code"
                          onChangeText={handleChange('code')}
                          onBlur={handleBlur('code')}
                          value={values.code}
                          style={styles.FormTextInputNormalStyle}
                        />
                      )}
                      {errors.code && touched.code && (
                        <Text style={styles.FormTextErrorStyle}>
                          {errors.code}
                        </Text>
                      )}
                    </View>
                    <View>
                      {errors.email && touched.email ? (
                        <TextInput
                          placeholder="Email"
                          onChangeText={handleChange('email')}
                          onBlur={handleBlur('email')}
                          value={values.email}
                          style={styles.FormTextInputErrorStyle}
                        />
                      ) : (
                        <TextInput
                          placeholder="Email"
                          onChangeText={handleChange('email')}
                          onBlur={handleBlur('email')}
                          value={values.email}
                          style={styles.FormTextInputNormalStyle}
                        />
                      )}
                      {errors.email && touched.email && (
                        <Text style={styles.FormTextErrorStyle}>
                          {errors.email}
                        </Text>
                      )}
                    </View>
                    <View style={styles.PasswordWrapperStyle}>
                      <View>
                        {errors.password && touched.password ? (
                          <TextInput
                            placeholder="Password"
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            secureTextEntry={openPassword ? true : false}
                            style={styles.FormTextInputErrorStyle}
                          />
                        ) : (
                          <TextInput
                            placeholder="New Password"
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            secureTextEntry={openPassword ? true : false}
                            style={styles.FormTextInputNormalStyle}
                          />
                        )}
                        {errors.password && touched.password && (
                          <Text style={styles.FormErrorTextStyle}>
                            {errors.password}
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
                        {errors.confirmPassword && touched.confirmPassword && (
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
                      <Text style={styles.FontStyle}>Reset Password</Text>
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

export default ResetPassword;
