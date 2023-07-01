import React from 'react';
import {Appbar} from 'react-native-paper';
import {View, Text, Image} from 'react-native';
import {RadioButton} from 'react-native-paper';
import styles from '../styles/global';
import {useFocusEffect} from '@react-navigation/native';
import http from '../helpers/http';
import {useSelector} from 'react-redux';

const PaymentMethod = () => {
  const token = useSelector(state => state.auth.token);
  const [payment, setPayment] = React.useState([]);
  const [checked, setChecked] = React.useState(false);

  useFocusEffect(
    React.useCallback(() => {
      async function getPayment() {
        const {data} = await http(token).get('/payment');
        setPayment(data.results);
      }
      getPayment();
    }, []),
  );

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
                  status={checked ? 'checked' : 'unchecked'}
                  onPress={() => setChecked(!checked)}
                />
                <Image source={require('../assets/images/creditcard.png')} />
                <Text
                  style={styles.PaymentMethodText}
                  onPress={() => setChecked(!checked)}>
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
    </React.Fragment>
  );
};

export default PaymentMethod;
