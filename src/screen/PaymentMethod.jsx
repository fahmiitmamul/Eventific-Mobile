import React from 'react';
import {Appbar} from 'react-native-paper';
import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
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
  const [checked, setChecked] = React.useState(false);

  useFocusEffect(
    React.useCallback(() => {
      async function getPayment() {
        const {data} = await http(token).get('/payment');
        setPayment(data.results);
      }
      getPayment();
    }, [token]),
  );

  async function makePayment() {
    try {
      const paymentMethodId = paymentId;
      const body = new URLSearchParams({
        reservationId,
        paymentMethodId,
      }).toString();
      const {data} = await http(token).post('/payment', body);
      if (data.success === true) {
        navigation.navigate('My Booking');
      }
    } catch (err) {
      console.warn(err.response?.data?.message);
    }
  }

  return (
    <View style={styles.MainSecondWrapper}>
      <Appbar.Header style={styles.ScrollViewStyle}>
        <Appbar.BackAction onPress={() => {}} color="white" />
        <Appbar.Content titleStyle={styles.ManageHeaderStyle} title="Payment" />
      </Appbar.Header>
      <View style={styles.PaymentWrapper}>
        <View>
          <Text style={styles.TextPayment}>Payment Method</Text>
        </View>
        <View style={styles.PaymentFlatlistStyle}>
          <FlatList
            data={payment}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
              return (
                <View style={styles.PaymentMethodWrapper}>
                  <View style={styles.PaymentMethodChildWrapper}>
                    <RadioButton
                      value="0"
                      status={checked === item.id ? 'checked' : 'unchecked'}
                      onPress={() => {
                        setPaymentId(item.id);
                        setChecked(item.id);
                      }}
                    />
                    <Image
                      source={{
                        uri: `https://res.cloudinary.com/dxnewldiy/image/upload/f_auto,q_auto/v1/payment/${item.picture}`,
                      }}
                      style={styles.PaymentMethodImg}
                    />
                    <Text
                      style={styles.PaymentMethodText}
                      onPress={() => setPaymentId(item.id)}>
                      {item.name}
                    </Text>
                  </View>
                  <View>
                    <Image
                      source={require('../assets/images/chevron-down.png')}
                    />
                  </View>
                </View>
              );
            }}
          />
          <View style={styles.TotalPaymentWrapper}>
            <View style={styles.TotalPaymentSecondWrapper}>
              <Text style={styles.TotalPaymentTextStyle}>
                Total: Rp.{totalPayment}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.MakePaymentBtnStyle}
              onPress={makePayment}>
              <Text style={styles.MakePaymentTextStyle}>Pay Tickets</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PaymentMethod;
