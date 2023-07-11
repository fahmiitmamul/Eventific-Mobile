import {View, Text, Image} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faClock, faLocationDot} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import http from '../helpers/http';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {Modal} from 'react-native';
import SimpleLottie from '../components/LottieAnimation';
import {StatusBar} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Button} from 'react-native-paper';

const EventDetails = ({route, navigation}) => {
  const {id} = route.params;
  const [events, setEvents] = React.useState([]);
  const token = useSelector(state => state.auth.token);
  const [modalVisible, setModalVisible] = React.useState(false);

  useFocusEffect(
    React.useCallback(() => {
      async function getEventDetails() {
        const {data} = await http().get(`/events/${id}`);
        setEvents(data.results);
      }

      getEventDetails();
    }),
  );

  async function addWishlists() {
    setModalVisible(true);
    try {
      const eventId = id;
      const body = new URLSearchParams({eventId}).toString();
      const {data} = await http(token).post('/wishlist', body);
      if (data.success == true) {
        navigation.navigate('My Wishlists');
      }
    } catch (err) {
      console.warn(err);
    }
    setModalVisible(false);
  }

  async function makePayments() {
    const eventId = id;
    const statusId = 1;
    const paymentMethodId = 1;
    const body = new URLSearchParams({
      eventId,
      statusId,
      paymentMethodId,
    }).toString();
    const {data} = await http(token).post('/reservations', body);
    if (data.success === true) {
      navigation.navigate('Purchase Ticket', {
        reservationId: data.results.reservation.id,
        eventTitle: data.results.title,
      });
    }
  }

  return (
    <ScrollView
      style={{
        position: 'relative',
        backgroundColor: 'white',
      }}>
      <StatusBar
        animated={true}
        translucent={true}
        backgroundColor="#ffffff00"
      />
      <View style={{width: '100%', height: '0%', backgroundColor: 'orange'}}>
        <View style={{position: 'relative'}}>
          <Image
            source={{
              uri: `https://res.cloudinary.com/dxnewldiy/image/upload/v1683808473/${events?.picture}`,
            }}
            style={{height: 450, width: '100%'}}
          />
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            colors={['#ffffff00', '#000000']}
            style={{
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5,
              height: 450,
              width: '100%',
            }}></LinearGradient>
        </View>
        <View style={{position: 'absolute', top: 200, margin: 20}}>
          <Text
            style={{
              color: 'white',
              fontFamily: 'Poppins-Medium',
              fontSize: 25,
            }}>
            {events?.title}
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}>
            <FontAwesomeIcon icon={faLocationDot} color="white" />
            <Text
              style={{
                color: 'white',
                fontFamily: 'Poppins-Regular',
              }}>
              {events?.location}
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}>
            <FontAwesomeIcon icon={faClock} color="white" />
            <Text
              style={{
                color: 'white',
                fontFamily: 'Poppins-Regular',
              }}>
              {moment(events?.date).format('LLL')}
            </Text>
          </View>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              color: 'white',
              fontSize: 20,
            }}>
            Attendees
          </Text>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <View
              style={{
                overflow: 'hidden',
                borderRadius: 100,
                width: 40,
              }}>
              <Image
                source={require('../assets/images/attendes-1.jpg')}
                style={{width: 40, height: 40}}
              />
            </View>
            <View
              style={{
                overflow: 'hidden',
                borderRadius: 100,
                width: 40,
                marginLeft: -13,
              }}>
              <Image
                source={require('../assets/images/attendes-2.jpg')}
                style={{width: 40, height: 40}}
              />
            </View>
            <View
              style={{
                overflow: 'hidden',
                borderRadius: 100,
                width: 40,
                marginLeft: -13,
              }}>
              <Image
                source={require('../assets/images/attendes-3.jpg')}
                style={{width: 40, height: 40}}
              />
            </View>
            <View
              style={{
                overflow: 'hidden',
                borderRadius: 100,
                width: 40,
                marginLeft: -13,
              }}>
              <Image
                source={require('../assets/images/attendes-4.jpg')}
                style={{width: 40, height: 40}}
              />
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          padding: 30,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          backgroundColor: 'white',
          top: 400,
        }}>
        <View>
          <Text
            style={{
              fontFamily: 'Poppins-Medium',
              fontSize: 20,
              color: 'black',
            }}>
            Event Detail
          </Text>
          <Text style={{fontFamily: 'Poppins-Regular'}}>
            {events?.description}
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              color: '#3366ff',
              fontSize: 13,
            }}>
            Read More
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontFamily: 'Poppins-Medium',
              fontSize: 20,
              color: 'black',
              marginTop: 10,
            }}>
            Location
          </Text>
          <Image source={require('../assets/images/maps.png')} />
        </View>
        <View style={{marginTop: 30}}>
          <TouchableOpacity
            onPress={makePayments}
            style={{
              backgroundColor: '#19a7ce',
              borderRadius: 8,
              padding: 8,
            }}>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Poppins-Medium',
                textAlign: 'center',
                padding: 5,
              }}>
              Buy Tickets
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 25,
            backgroundColor: 'white',
          }}>
          <SimpleLottie />
        </View>
      </Modal>
    </ScrollView>
  );
};

export default EventDetails;
