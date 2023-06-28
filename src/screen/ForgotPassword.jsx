import React from 'react';
import {ScrollView, Text, TextInput, View, Image} from 'react-native';
import {Formik} from 'formik';
import {Button} from 'react-native-paper';
import * as Yup from 'yup';
import {Appbar} from 'react-native-paper';
import styles from '../styles/global';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
});

const ForgotPassword = ({navigation}) => {
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
        <View>
          <Formik
            initialValues={{
              email: '',
            }}
            validationSchema={validationSchema}
            onSubmit={values => console.log(values)}>
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
                    <Button
                      mode="contained"
                      onPress={() => navigation.navigate('ResetPassword')}>
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
