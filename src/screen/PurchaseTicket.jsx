import React from 'react';
import http from '../helpers/http';
import styles from '../styles/global';
import {Appbar} from 'react-native-paper';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMinus, faPlus} from '@fortawesome/free-solid-svg-icons';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {FlatList} from 'react-native';

const PurchaseTicket = ({route, navigation}) => {
  const {reservationId, eventTitle} = route.params;
  const token = useSelector(state => state.auth.token);
  const [errorMsg, setErrorMsg] = React.useState('');
  const [sections, setSections] = React.useState([]);

  useFocusEffect(
    React.useCallback(() => {
      async function getSections() {
        const {data} = await http(token).get('/reservations/sections');
        setSections(data.results);
      }

      getSections();
    }, [token]),
  );

  const [filledSection, setFilledSection] = React.useState({
    id: 0,
    quantity: 0,
  });

  const increment = id => {
    if (filledSection.quantity === 10) {
      setErrorMsg('Maximum 10 Tickets');
    } else {
      setFilledSection({id, quantity: filledSection.quantity + 1});
    }
  };

  const decrement = id => {
    setFilledSection({id, quantity: filledSection.quantity - 1});
    if (filledSection.quantity === 0) {
      setFilledSection({quantity: 0});
    }
  };

  setTimeout(() => {
    if (errorMsg) {
      setErrorMsg(false);
    }
  }, 5000);

  const selectedSection =
    filledSection && sections.filter(item => item.id === filledSection.id)[0];

  async function sendData() {
    try {
      const sectionId = selectedSection?.id;
      const quantity = filledSection.quantity;
      const body = new URLSearchParams({
        reservationId,
        sectionId,
        quantity,
      }).toString();
      if (quantity === 0) {
        setErrorMsg('Please select quantity');
      } else {
        const {data} = await http(token).post('/reservations/ticket', body);
        if (data.success == true) {
          navigation.navigate('Payment Method', {
            reservationId: reservationId,
            eventTitle: eventTitle,
            section: selectedSection?.name,
            quantity: filledSection.quantity,
            totalPayment: selectedSection?.price * filledSection.quantity,
          });
        }
      }
    } catch (err) {
      console.warn(err);
    }
  }

  return (
    <View style={styles.ContentWrapper}>
      <Appbar.Header style={styles.ScrollViewStyle}>
        <Appbar.BackAction onPress={() => {}} color="white" />
        <Appbar.Content
          titleStyle={styles.ManageHeaderStyle}
          title="Checkout"
        />
      </Appbar.Header>
      <FlatList
        ListHeaderComponent={
          <>
            <View style={styles.TicketImgWrapper}>
              <Image source={require('../assets/images/tickets.png')} />
            </View>
            <View style={{marginTop: 50}}>
              {errorMsg && (
                <View style={styles.FormErrorViewStyle}>
                  <Text style={styles.FormErrorTextStyle}>{errorMsg}</Text>
                </View>
              )}
            </View>
            <View style={{marginHorizontal: 30}}>
              <View style={styles.TitleWrapperStyle}>
                <View>
                  <Text style={styles.TicketTitleStyle}>Tickets</Text>
                </View>
                <View style={styles.FilterWrapperStyle}>
                  <Text style={styles.FilterTextStyle}>BY PRICE</Text>
                  <Image source={require('../assets/images/filter.png')} />
                </View>
              </View>
            </View>
          </>
        }
        ListFooterComponent={
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: 'white',
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 20,
                paddingTop: 30,
                paddingLeft: 20,
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'Poppins-Medium',
                  color: 'black',
                }}>
                {selectedSection?.name || 'Not Set'}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'Poppins-Medium',
                  color: 'black',
                }}>
                {filledSection.quantity}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'Poppins-Medium',
                  color: 'black',
                }}>
                Rp.{selectedSection?.price * filledSection.quantity || '0'}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                width: 150,
                height: 40,
                backgroundColor: '#19a7ce',
                borderRadius: 5,
                margin: 20,
              }}
              onPress={sendData}>
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  textAlign: 'center',
                  paddingTop: 8,
                  color: 'white',
                }}>
                Checkout
              </Text>
            </TouchableOpacity>
          </View>
        }
        data={sections}
        renderItem={({item}) => {
          return (
            <View style={styles.TicketContentWrapper}>
              <View style={{marginBottom: 30}}>
                <View style={styles.ProfileValueWrapper}>
                  <Image
                    source={{
                      uri: `https://res.cloudinary.com/dxnewldiy/image/upload/f_auto,q_auto/v1/payment/${item.picture}`,
                      width: 40,
                      height: 40,
                    }}
                  />
                  <View style={styles.TicketSectionWrapper}>
                    <View>
                      <Text style={styles.TicketSectionTextStyle}>
                        {item.name}
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Poppins-Regular',
                          fontSize: 10,
                        }}>
                        12 Seats Available
                      </Text>
                    </View>
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                      <Text style={styles.TicketSectionTextStyle}>
                        {item.price}
                      </Text>
                      <Text style={{fontFamily: 'Poppins-Regular'}}>
                        /person
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.QuantityWrapper}>
                  <View>
                    <Text style={styles.QuantityTextStyle}>Quantity</Text>
                  </View>
                  <View style={styles.QuantityBtnWrapper}>
                    <TouchableOpacity
                      onPress={() => decrement(item.id)}
                      style={styles.QuantityBtn}>
                      <FontAwesomeIcon icon={faMinus} />
                    </TouchableOpacity>
                    <Text style={{fontFamily: 'Poppins-Bold'}}>
                      {item.id === filledSection.id
                        ? filledSection.quantity
                        : 0}
                    </Text>
                    <TouchableOpacity
                      onPress={() => increment(item.id)}
                      style={styles.QuantityBtn}>
                      <FontAwesomeIcon icon={faPlus} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          );
        }}
        style={{
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          backgroundColor: 'white',
          width: '100%',
          height: '100%',
        }}
      />
    </View>
  );
};

export default PurchaseTicket;
