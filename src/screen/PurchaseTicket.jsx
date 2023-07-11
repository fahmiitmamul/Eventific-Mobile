import React from 'react';
import {Appbar} from 'react-native-paper';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMinus, faPlus} from '@fortawesome/free-solid-svg-icons';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import http from '../helpers/http';
import HamburgerIcon from '../assets/images/hamburger.png';
import styles from '../styles/global';
import {ScrollView} from 'react-native-gesture-handler';

const PurchaseTicket = ({route, navigation}) => {
  const {reservationId, eventTitle} = route.params;
  const token = useSelector(state => state.auth.token);
  const [sections, setSections] = React.useState([]);

  useFocusEffect(
    React.useCallback(() => {
      async function getSections() {
        const {data} = await http(token).get('/reservations/sections');
        setSections(data.results);
      }

      getSections();
    }, []),
  );

  const [filledSection, setFilledSection] = React.useState({
    id: 0,
    quantity: 0,
  });

  const increment = id => {
    setFilledSection({id, quantity: filledSection.quantity + 1});
  };
  const decrement = id => {
    setFilledSection({id, quantity: filledSection.quantity - 1});
  };

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
    } catch (err) {
      console.warn(err);
    }
  }

  return (
    <ScrollView style={styles.ContentWrapper}>
      <Appbar.Header style={styles.ScrollViewStyle}>
        <Appbar.BackAction onPress={() => {}} color="white" />
        <Appbar.Content
          titleStyle={styles.ManageHeaderStyle}
          title="Checkout"
        />
      </Appbar.Header>
      <View
        style={{
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          backgroundColor: 'white',
        }}>
        <View style={styles.TicketImgWrapper}>
          <Image source={require('../assets/images/tickets.png')} />
        </View>
        <View style={styles.TicketWrapper}>
          <View style={styles.TitleWrapperStyle}>
            <View>
              <Text style={styles.TicketTitleStyle}>Tickets</Text>
            </View>
            <View style={styles.FilterWrapperStyle}>
              <Text style={styles.FilterTextStyle}>BY PRICE</Text>
              <Image source={require('../assets/images/filter.png')} />
            </View>
          </View>
          <View style={{display: 'flex', flexDirection: 'column', gap: 20}}>
            {sections.map(item => {
              return (
                <View style={styles.TicketContentWrapper} key={item.id}>
                  <View>
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
                          <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>
                        </TouchableOpacity>
                        <Text style={{fontFamily: 'Poppins-Bold'}}>
                          {item.id === filledSection.id
                            ? filledSection.quantity
                            : 0}
                        </Text>
                        <TouchableOpacity
                          onPress={() => increment(item.id)}
                          style={styles.QuantityBtn}>
                          <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          height: '100%',
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
    </ScrollView>
  );
};

export default PurchaseTicket;
