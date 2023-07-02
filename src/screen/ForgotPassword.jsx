import React from 'react';
import {ScrollView, Text, TextInput, View, Image} from 'react-native';
import {Formik} from 'formik';
import {Button} from 'react-native-paper';
import * as Yup from 'yup';
import {Appbar} from 'react-native-paper';
import styles from '../styles/global';
import http from '../helpers/http';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
});

const ForgotPassword = ({navigation}) => {
  const [successMsg, setSuccessMsg] = React.useState('');
  const [errorMsg, setErrorMsg] = React.useState('');

  const doForgot = async function (values) {
    const email = values.email;
    const form = new URLSearchParams({email}).toString();
    try {
      const {data} = await http().post('/auth/forgot-password', form);
      setSuccessMsg(data.message);
    } catch (err) {
      const errMsg = err?.response?.data?.message;
      setErrorMsg(errMsg);
    }
  };

  if (successMsg) {
    setTimeout(() => {
      navigation.navigate('ResetPassword');
    }, 3000);
  }

  React.useEffect(() => {
    setTimeout(() => {
      if (successMsg || errorMsg) {
        setErrorMsg(false);
        setSuccessMsg(false);
      }
    }, 3000);
  }, []);

  return (
    <React.Fragment>
      <Appbar.Header style={styles.ScrollViewStyle}>
        <Appbar.BackAction onPress={() => {}} />
      </Appbar.Header>
      <ScrollView style={styles.ScrollViewStyle}>
        <View style={styles.ViewHeader}>
          <View>
            <Text style={styles.TextLoginStyle}>Forgot Password</Text>
          </View>
          <View style={styles.SubtitleWrapper}>
            <Text style={styles.FontStyle}>
              You'll get mail soon on your email
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
              email: '',
            }}
            validationSchema={validationSchema}
            onSubmit={doForgot}>
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
                      {errors.email && touched.email ? (
                        <TextInput
                          placeholder="Email"
                          onChangeText={handleChange('email')}
                          onBlur={handleBlur('email')}
                          value={values.email}
                          style={styles.FormTextInputErrorStyle}></TextInput>
                      ) : (
                        <TextInput
                          placeholder="Email"
                          onChangeText={handleChange('email')}
                          onBlur={handleBlur('email')}
                          value={values.email}
                          style={styles.FormTextInputNormalStyle}></TextInput>
                      )}
                      {errors.email && touched.email && (
                        <Text style={styles.FormErrorTextStyle}>
                          {errors.email}
                        </Text>
                      )}
                    </View>
                  </View>
                  <View style={styles.BtnWrapperStyle}>
                    <Button mode="contained" onPress={handleSubmit}>
                      <Text style={styles.FontStyle}>Send</Text>
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

export default ForgotPassword;
