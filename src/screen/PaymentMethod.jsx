import React from 'react';
import {Appbar} from 'react-native-paper';
import {View, Text, Image} from 'react-native';
import {RadioButton} from 'react-native-paper';
import styles from '../styles/global';

const PaymentMethod = () => {
  const [checked, setChecked] = React.useState(false);
  const [checked1, setChecked1] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);
  const [checked3, setChecked3] = React.useState(false);

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
        <View style={styles.PaymentMethodWrapper}>
          <View style={styles.PaymentMethodChildWrapper}>
            <RadioButton
              value="first"
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => setChecked(!checked)}
            />
            <Image source={require('../assets/images/creditcard.png')} />
            <Text
              style={styles.PaymentMethodText}
              onPress={() => setChecked(!checked)}>
              Card
            </Text>
          </View>
          <View>
            <Image source={require('../assets/images/chevron-down.png')} />
          </View>
        </View>
        <View style={styles.PaymentMethodWrapper}>
          <View style={styles.PaymentMethodChildWrapper}>
            <RadioButton
              value="first"
              status={checked1 ? 'checked' : 'unchecked'}
              onPress={() => setChecked1(!checked1)}
            />
            <Image source={require('../assets/images/creditcard.png')} />
            <Text
              style={styles.PaymentMethodText}
              onPress={() => setChecked1(!checked1)}>
              Card
            </Text>
          </View>
          <View>
            <Image source={require('../assets/images/chevron-down.png')} />
          </View>
        </View>
        <View style={styles.PaymentMethodWrapper}>
          <View style={styles.PaymentMethodChildWrapper}>
            <RadioButton
              value="first"
              status={checked2 ? 'checked' : 'unchecked'}
              onPress={() => setChecked2(!checked2)}
            />
            <Image source={require('../assets/images/creditcard.png')} />
            <Text
              style={styles.PaymentMethodText}
              onPress={() => setChecked2(!checked2)}>
              Card
            </Text>
          </View>
          <View>
            <Image source={require('../assets/images/chevron-down.png')} />
          </View>
        </View>
        <View style={styles.PaymentMethodWrapper}>
          <View style={styles.PaymentMethodChildWrapper}>
            <RadioButton
              value="first"
              status={checked3 ? 'checked' : 'unchecked'}
              onPress={() => setChecked3(!checked3)}
            />
            <Image source={require('../assets/images/creditcard.png')} />
            <Text
              style={styles.PaymentMethodText}
              onPress={() => setChecked3(!checked3)}>
              Card
            </Text>
          </View>
          <View>
            <Image source={require('../assets/images/chevron-down.png')} />
          </View>
        </View>
      </View>
    </React.Fragment>
  );
};

export default PaymentMethod;
