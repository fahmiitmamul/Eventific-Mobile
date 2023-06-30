/* eslint-disable no-dupe-keys */
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  //Home
  TextInputWrapper: {
    height: 80,
    backgroundColor: '#19A7CE',
    padding: 18,
    zIndex: 0,
  },
  TextInputChildWrapper: {
    position: 'relative',
  },
  IconSearchStyle: {
    position: 'absolute',
    top: 9,
    left: 15,
    color: 'white',
  },
  SearchInput: {
    borderWidth: 1,
    borderColor: 'white',
    fontSize: 18,
    color: 'white',
    borderRadius: 10,
    paddingLeft: 50,
    fontFamily: 'Poppins-Regular',
    paddingBottom: 4,
  },
  EventsTextStyle: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
  },
  EventsWrapperStyle: {
    margin: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  //Sign In
  ScrollViewStyle: {
    backgroundColor: 'white',
  },
  HomeHeaderStyle: {
    backgroundColor: '#19A7CE',
  },
  ViewHeader: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    padding: 50,
  },
  TextLoginStyle: {
    fontSize: 24,
    color: 'black',
    fontFamily: 'Poppins-Medium',
  },
  SubtitleWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
  },
  FormErrorViewStyle: {
    paddingLeft: 50,
    paddingRight: 50,
  },
  FormErrorTextStyle: {
    backgroundColor: '#e23258',
    padding: 10,
    color: 'white',
    borderRadius: 10,
    marginBottom: 30,
    fontFamily: 'Poppins-Medium',
  },
  FormWrapperStyle: {
    display: 'flex',
    flexDirection: 'column',
    gap: 30,
    paddingLeft: 50,
    paddingRight: 50,
  },
  FormTextInputErrorStyle: {
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 15,
    borderStyle: 'solid',
    paddingLeft: 20,
    fontFamily: 'Poppins-Regular',
    paddingTop: 15,
    paddingLeft: 20,
  },
  FormTextInputNormalStyle: {
    borderWidth: 1,
    borderColor: '#C1C5D0',
    borderRadius: 15,
    borderStyle: 'solid',
    paddingLeft: 20,
    fontFamily: 'Poppins-Regular',
    paddingTop: 15,
    paddingLeft: 20,
  },
  FormTextErrorStyle: {
    color: 'red',
    paddingTop: 10,
    fontFamily: 'Poppins-Regular',
  },
  PasswordWrapperStyle: {
    position: 'relative',
  },
  EyeButtonStyle: {
    position: 'absolute',
    top: 12,
    right: 15,
  },
  ForgotPasswordWrapperStyle: {
    marginLeft: 50,
    marginRight: 50,
  },
  ForgotPassTextStyle: {
    color: '#3366FF',
    paddingTop: 15,
    textAlign: 'right',
    fontFamily: 'Poppins-Regular',
  },
  BtnWrapperStyle: {
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 30,
  },
  FontStyle: {
    fontFamily: 'Poppins-Regular',
  },
  AlternateSignWrapper: {
    display: 'flex',
    marginTop: 50,
    marginLeft: 40,
    marginRight: 40,
    flexDirection: 'column',
    gap: 20,
  },
  AlternateSignSecondWrapper: {
    paddingLeft: '50',
    paddingRight: '50',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  LogoWrapperStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  LogoBorderStyle: {
    borderWidth: 2,
    width: 95,
    height: 52,
    borderColor: '#3366FF',
    borderRadius: 6,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  //Sign Up
  LinkLoginStyle: {
    color: 'blue',
    fontFamily: 'Poppins-Regular',
  },
  TermsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 40,
    paddingTop: 10,
    alignItems: 'center',
  },
  TermsText: {
    fontFamily: 'Poppins-Regular',
    paddingTop: 3,
  },
  //Change Password
  ChangePassFormWrapper: {
    paddingTop: 50,
  },
  //Manage Event
  AppWrapper: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
  },
  ManageHeaderStyle: {
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    marginRight: 40,
  },
  ManageWrapperStyle: {
    display: 'flex',
    flexDirection: 'row',
    gap: 30,
    paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 40,
    paddingLeft: 40,
  },
  ManageWrapperChildStyle: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  DateWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 5,
    borderRadius: 10,
  },
  TextDate: {
    fontFamily: 'Poppins-Bold',
    color: 'orange',
    fontSize: 18,
  },
  HeartWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  TitleWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  TitleStyles: {
    fontSize: 24,
    fontFamily: 'Poppins-Medium',
    color: 'black',
  },
  ManageBtn: {
    fontFamily: 'Poppins-Regular',
    color: '#3366ff',
    marginTop: 10,
  },
  //Payment Method
  PaymentWrapper: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    paddingLeft: 30,
    paddingTop: 30,
  },
  TextPayment: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: 'black',
  },
  PaymentMethodWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    justifyContent: 'space-between',
    marginRight: 50,
  },
  PaymentMethodChildWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  PaymentMethodText: {
    fontFamily: 'Poppins-Medium',
    color: 'black',
  },
  //Profile
  ContentWrapper: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  PictureWrapper: {
    alignItems: 'center',
    height: 200,
  },
  PictureChildWrapper: {
    overflow: 'hidden',
    width: '50%',
    height: '100%',
    marginTop: 30,
  },
  ImageStyle: {
    objectFit: 'contain',
    width: '80%',
    height: '80%',
    borderRadius: 100,
    marginLeft: 20,
  },
  ProfileContentWrapper: {
    margin: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  ProfileContentHeader: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
  },
  ProfileNameInput: {
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    width: '100%',
  },
  EditBtnStyle: {
    fontFamily: 'Poppins-Medium',
    color: '#3366ff',
  },
  ProfileValueWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  GenderWrapperStyle: {
    display: 'flex',
    flexDirection: 'row',
  },
  RadioWrapperStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  SelectDropdownStyle: {
    width: '80%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  BirthDateWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  SaveBtnStyle: {
    width: '100%',
    backgroundColor: '#3366ff',
    padding: 12,
    borderRadius: 10,
  },
  SaveTextStyle: {
    fontFamily: 'Poppins-Medium',
    color: 'white',
    textAlign: 'center',
  },
  //Purchase Ticket
  TicketImgWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
  },
  TicketWrapper: {
    margin: 30,
  },
  TitleWrapperStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  TicketTitleStyle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
    color: 'black',
    paddingTop: 18,
  },
  FilterWrapperStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  FilterTextStyle: {
    fontFamily: 'Poppins-Bold',
    color: '#FF3D71',
  },
  TicketContentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 30,
    marginBottom: 20,
  },
  TicketSectionWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: 30,
  },
  TicketSectionTextStyle: {
    fontFamily: 'Poppins-Bold',
    color: 'black',
  },
  QuantityWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 100,
    marginLeft: 55,
    marginTop: 10,
  },
  QuantityTextStyle: {
    fontFamily: 'Poppins-Regular',
    color: 'black',
  },
  QuantityBtnWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  QuantityBtn: {
    borderWidth: 2,
    padding: 5,
    borderColor: '#C1C5D0',
    borderRadius: 5,
  },
});

export default styles;