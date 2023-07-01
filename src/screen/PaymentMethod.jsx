import React from 'react';
import {Appbar} from 'react-native-paper';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {RadioButton} from 'react-native-paper';
import styles from '../styles/global';
import {useFocusEffect} from '@react-navigation/native';
import http from '../helpers/http';
import {useSelector} from 'react-redux';

const PaymentMethod = ({route, navigation}) => {
  const {reservationId, totalPayment} = route.params;
  const token = useSelector(state => state.auth.token);
  const [payment, setPayment] = React.useState([]);
  const [paymentId, setPaymentId] = React.useState('');

  useFocusEffect(
    React.useCallback(() => {
      async function getPayment() {
        const {data} = await http(token).get('/payment');
        setPayment(data.results);
      }
      getPayment();
    }, []),
  );

  async function makePayment() {
    try {
      const paymentMethodId = paymentId;
      const body = new URLSearchParams({
        reservationId,
        paymentMethodId,
      }).toString();
      const {data} = await http(token).post('/payment', body);
      if (data.success == true) {
        navigation.navigate('My Booking');
      }
    } catch (err) {
      console.warn(err.response?.data?.message);
    }
  }

  return (
    <React.Fragment>
      <Appbar.Header style={styles.ScrollViewStyle}>
        <Appbar.BackAction onPress={() => {}} />
        <Appbar.Content titleStyle={styles.ManageHeaderStyle} title="Payment" />
      </Appbar.Header>
      <View style={styles.PaymentWrapper}>
        <View>
          <Text style={styles.TextPayment}>Payment Method</Text>
        </View>
        {payment.map(p => {
          return (
            <View style={styles.PaymentMethodWrapper} key={p.id}>
              <View style={styles.PaymentMethodChildWrapper}>
                <RadioButton
                  value="0"
                  status="checked"
                  onPress={() => setPaymentId(p.id)}
                />
                <Image source={require('../assets/images/creditcard.png')} />
                <Text
                  style={styles.PaymentMethodText}
                  onPress={() => setPaymentId(p.id)}>
                  {p.name}
                </Text>
              </View>
              <View>
                <Image source={require('../assets/images/chevron-down.png')} />
              </View>
            </View>
          );
        })}
      </View>
      <View
        style={{
          width: '100%',
          height: '10%',
          borderRadius: 10,
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
            Total: Rp.{totalPayment}
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
          onPress={makePayment}>
          <Text
            style={{
              fontFamily: 'Poppins-Medium',
              textAlign: 'center',
              paddingTop: 8,
              color: 'white',
            }}>
            Pay Tickets
          </Text>
        </TouchableOpacity>
      </View>
    </React.Fragment>
  );
};

export default PaymentMethod;
