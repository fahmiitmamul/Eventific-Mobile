import React from 'react';
import {ScrollView, Text, TextInput, View, Image} from 'react-native';
import {Formik} from 'formik';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import {Button} from 'react-native-paper';
import * as Yup from 'yup';
import {Appbar} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {asyncLoginAction} from '../redux/actions/auth';
import {clearMessage} from '../redux/reducers/auth';
import styles from '../styles/global';
import SplashScreen from 'react-native-splash-screen';

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is Required'),
  email: Yup.string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
  password: Yup.string()
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is Required'),
});

const SignIn = ({navigation}) => {
  const [openPassword, setOpenPassword] = React.useState(false);
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const formError = useSelector(state => state.auth.formError[0]?.msg);
  const errorMsg = useSelector(state => state.auth.errorMessage);
  const warningMsg = useSelector(state => state.auth.warningMessage);

  function Password() {
    setOpenPassword(!openPassword);
  }

  const doLogin = function (values) {
    dispatch(asyncLoginAction(values));
    if (token) {
      navigation.navigate('Home');
    }
  };

  if (formError || warningMsg || errorMsg) {
    setTimeout(() => {
      dispatch(clearMessage());
    }, 3000);
  }

  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <React.Fragment>
      <Appbar.Header style={styles.ScrollViewStyle}>
        <Appbar.BackAction onPress={() => {}} />
      </Appbar.Header>
      <ScrollView style={styles.ScrollViewStyle}>
        <View style={styles.ViewHeader}>
          <View>
            <Text style={styles.TextLoginStyle}>Log In</Text>
          </View>
          <View style={styles.SubtitleWrapper}>
            <Text style={styles.FontStyle}>Hi, Welcome Back to EventPraga</Text>
          </View>
        </View>
        {formError && (
          <View style={styles.FormErrorViewStyle}>
            <Text style={styles.FormErrorTextStyle}>{formError}</Text>
          </View>
        )}
        {errorMsg && (
          <View style={styles.FormErrorViewStyle}>
            <Text style={styles.FormErrorTextStyle}>{errorMsg}</Text>
          </View>
        )}
        {warningMsg && (
          <View style={styles.FormErrorViewStyle}>
            <Text style={styles.FormErrorTextStyle}>{warningMsg}</Text>
          </View>
        )}
        <View>
          <Formik
            initialValues={{
              username: '',
              email: '',
              password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={doLogin}>
            {({
              values,
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              touched,
            }) => {
              return (
                <View>
                  <View style={styles.FormWrapperStyle}>
                    <View>
                      {errors.username && touched.username ? (
                        <TextInput
                          placeholder="Username"
                          onChangeText={handleChange('username')}
                          onBlur={handleBlur('username')}
                          value={values.username}
                          style={styles.FormTextInputErrorStyle}></TextInput>
                      ) : (
                        <TextInput
                          placeholder="Username"
                          onChangeText={handleChange('username')}
                          onBlur={handleBlur('username')}
                          value={values.username}
                          style={styles.FormTextInputNormalStyle}></TextInput>
                      )}
                      {errors.username && touched.username && (
                        <Text style={styles.FormTextErrorStyle}>
                          {errors.username}
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
                            style={styles.FormTextInputErrorStyle}></TextInput>
                        ) : (
                          <TextInput
                            placeholder="Password"
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            secureTextEntry={openPassword ? true : false}
                            style={styles.FormTextInputNormalStyle}></TextInput>
                        )}
                        {errors.password && touched.password && (
                          <Text style={styles.FormTextErrorStyle}>
                            {errors.password}
                          </Text>
                        )}
                      </View>
                      <Text style={styles.EyeButtonStyle} onPress={Password}>
                        <FontAwesomeIcon
                          icon={openPassword ? faEyeSlash : faEye}
                          size={30}></FontAwesomeIcon>
                      </Text>
                    </View>
                  </View>
                  <View style={styles.ForgotPasswordWrapperStyle}>
                    <Text
                      style={styles.ForgotPassTextStyle}
                      onPress={() => navigation.navigate('ForgotPassword')}>
                      Forgot Password ?
                    </Text>
                  </View>
                  <View style={styles.BtnWrapperStyle}>
                    <Button mode="contained" onPress={handleSubmit}>
                      <Text style={styles.FontStyle}>Login</Text>
                    </Button>
                  </View>
                </View>
              );
            }}
          </Formik>
        </View>
        <View style={styles.AlternateSignWrapper}>
          <View style={styles.AlternateSignSecondWrapper}>
            <Text style={styles.FontStyle}>or sign in with</Text>
          </View>
          <View style={styles.LogoWrapperStyle}>
            <View style={styles.LogoBorderStyle}>
              <Image source={require('../assets/images/google.png')} />
            </View>
            <View style={styles.LogoBorderStyle}>
              <Image source={require('../assets/images/facebook.png')} />
            </View>
            <View style={styles.LogoBorderStyle}>
              <Image source={require('../assets/images/finger.png')} />
            </View>
          </View>
        </View>
      </ScrollView>
    </React.Fragment>
  );
};

export default SignIn;
