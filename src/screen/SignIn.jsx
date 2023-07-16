import React from 'react';
import {Text, TextInput, View, Image} from 'react-native';
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
import {Modal} from 'react-native';
import SimpleLottie from '../components/LottieAnimation';

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
  const formError = useSelector(state => state.auth.formError[0]?.msg);
  const errorMsg = useSelector(state => state.auth.errorMessage);
  const successMsg = useSelector(state => state.auth.successMessage);
  const warningMsg = useSelector(state => state.auth.warningMessage);
  const [modalVisible, setModalVisible] = React.useState(false);

  function Password() {
    setOpenPassword(!openPassword);
  }

  const doLogin = async function (values) {
    setModalVisible(true);
    await dispatch(asyncLoginAction(values));
    setModalVisible(false);
  };

  if (formError || warningMsg || errorMsg || successMsg) {
    setTimeout(() => {
      dispatch(clearMessage());
    }, 3000);
  }

  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <View style={{backgroundColor: 'white', width: '100%', height: '100%'}}>
      <Appbar.Header style={{backgroundColor: 'white'}}>
        <Appbar.BackAction
          onPress={() => {
            navigation.navigate('SignUp');
          }}
        />
      </Appbar.Header>
      <View style={styles.ScrollViewStyle}>
        <View style={{backgroundColor: 'white'}}>
          <View style={styles.ViewHeader}>
            <View>
              <Text style={styles.TextLoginStyle}>Log In</Text>
            </View>
            <View style={styles.SubtitleWrapper}>
              <Text style={styles.FontStyle}>Don't have an account ?</Text>
              <Text
                style={{fontFamily: 'Poppins-Medium', color: '#3366ff'}}
                onPress={() => {
                  navigation.navigate('SignUp');
                }}>
                Sign Up
              </Text>
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
          {successMsg && (
            <View style={styles.FormErrorViewStyle}>
              <Text style={styles.FormSuccessTextStyle}>{successMsg}</Text>
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
                            style={styles.FormTextInputErrorStyle}
                          />
                        ) : (
                          <TextInput
                            placeholder="Username"
                            onChangeText={handleChange('username')}
                            onBlur={handleBlur('username')}
                            value={values.username}
                            style={styles.FormTextInputNormalStyle}
                          />
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
                              placeholder="Password"
                              onChangeText={handleChange('password')}
                              onBlur={handleBlur('password')}
                              value={values.password}
                              secureTextEntry={openPassword ? true : false}
                              style={styles.FormTextInputNormalStyle}
                            />
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
                            size={30}
                          />
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
        </View>
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
    </View>
  );
};

export default SignIn;
