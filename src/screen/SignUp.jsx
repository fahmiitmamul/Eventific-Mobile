import React from 'react';
import {ScrollView, Text, TextInput, View} from 'react-native';
import {Formik} from 'formik';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import {Checkbox} from 'react-native-paper';
import {Button} from 'react-native-paper';
import * as Yup from 'yup';
import {Appbar} from 'react-native-paper';
import {asyncRegisterAction} from '../redux/actions/auth';
import {useDispatch, useSelector} from 'react-redux';
import {clearMessage} from '../redux/reducers/auth';
import SplashScreen from 'react-native-splash-screen';
import styles from '../styles/global';

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Full Name Address is Required'),
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

const SignUp = ({navigation}) => {
  const [checked, setChecked] = React.useState(true);
  const [openPassword, setOpenPassword] = React.useState(false);
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const formError = useSelector(state => state.auth.formError[0]?.msg);
  const errorMsg = useSelector(state => state.auth.errorMessage);
  const warningMsg = useSelector(state => state.auth.warningMessage);
  const successMsg = useSelector(state => state.auth.successMessage);

  function Password() {
    setOpenPassword(!openPassword);
  }

  function Confirm() {
    setOpenConfirm(!openConfirm);
  }

  const doRegister = function (values) {
    dispatch(asyncRegisterAction(values));
    if (token) {
      setTimeout(() => {
        navigation.navigate('SignIn');
      }, 3000);
    }
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
    <React.Fragment>
      <Appbar.Header style={styles.ScrollViewStyle}>
        <Appbar.BackAction onPress={() => {}} />
      </Appbar.Header>
      <ScrollView style={styles.ScrollViewStyle}>
        <View style={styles.ViewHeader}>
          <View>
            <Text style={styles.TextLoginStyle}>Sign Up</Text>
          </View>
          <View style={styles.SubtitleWrapper}>
            <Text style={styles.FontStyle}>Already have an account ?</Text>
            <Text
              onPress={() => navigation.navigate('SignIn')}
              style={styles.LinkLoginStyle}>
              Log In
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
        {warningMsg && (
          <View style={styles.FormErrorViewStyle}>
            <Text style={styles.FormErrorTextStyle}>{warningMsg}</Text>
          </View>
        )}
        {successMsg && (
          <View style={styles.FormErrorViewStyle}>
            <Text style={styles.FormSuccessTextStyle}>{successMsg}</Text>
          </View>
        )}
        <View>
          <Formik
            initialValues={{
              fullName: '',
              email: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={validationSchema}
            onSubmit={doRegister}>
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
                      {errors.fullName && touched.fullName ? (
                        <TextInput
                          placeholder="Full Name"
                          onChangeText={handleChange('fullName')}
                          onBlur={handleBlur('fullName')}
                          value={values.fullName}
                          style={styles.FormTextInputErrorStyle}></TextInput>
                      ) : (
                        <TextInput
                          placeholder="Full Name"
                          onChangeText={handleChange('fullName')}
                          onBlur={handleBlur('fullName')}
                          value={values.fullName}
                          style={styles.FormTextInputNormalStyle}></TextInput>
                      )}
                      {errors.fullName && touched.fullName && (
                        <Text style={styles.FormTextErrorStyle}>
                          {errors.fullName}
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
                  <View style={styles.TermsWrapper}>
                    <View>
                      <Checkbox
                        status={checked ? 'unchecked' : 'checked'}
                        onPress={() => {
                          setChecked(!checked);
                        }}
                      />
                    </View>
                    <View>
                      <Text
                        style={styles.TermsText}
                        onPress={() => {
                          setChecked(!checked);
                        }}>
                        Accept terms and conditions
                      </Text>
                    </View>
                  </View>
                  <View style={styles.BtnWrapperStyle}>
                    <Button
                      mode="contained"
                      onPress={handleSubmit}
                      disabled={checked}>
                      <Text style={styles.FontStyle}>Sign Up</Text>
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

export default SignUp;
