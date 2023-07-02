import {View, Text, Image} from 'react-native';
import React from 'react';
import {Appbar} from 'react-native-paper';
import styles from '../styles/global';
import Heart from '../assets/images/heart.png';
import HamburgerIcon from '../assets/images/hamburger.png';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faClock,
  faLocation,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import http from '../helpers/http';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const EventDetails = ({route, navigation}) => {
  const {id} = route.params;
  const [events, setEvents] = React.useState([]);
  const token = useSelector(state => state.auth.token);

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
    try {
      const eventId = id;
      const body = new URLSearchParams({eventId}).toString();
      const {data} = await http(token).post('/wishlist', body);
      if (data.success == true) {
        setTimeout(() => {
          navigation.navigate('My Wishlists');
        }, 3000);
      }
    } catch (err) {
      console.warn(err);
    }
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
    <ScrollView>
      <Appbar.Header style={styles.ScrollViewStyle}>
        <Appbar.BackAction onPress={this._goBack} />
        <Appbar.Content
          titleStyle={{fontFamily: 'Poppins-Medium', paddingLeft: 70}}
          title="Event Detail"
        />
        <Appbar.Action color="black" icon={Heart} onPress={addWishlists} />
      </Appbar.Header>
      <View>
        <View style={{position: 'relative'}}>
          <View
            style={{
              overflow: 'hidden',
            }}>
            <Image
              source={{
                uri: `https://res.cloudinary.com/dxnewldiy/image/upload/v1683808473/${events?.picture}`,
              }}
              style={{height: 450}}
            />
          </View>
          <View
            style={{
              position: 'absolute',
              backgroundColor: 'black',
              opacity: 0.5,
              width: '100%',
              height: '100%',
            }}></View>
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
        <View style={{margin: 20}}>
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
      </View>
    </ScrollView>
  );
};

export default EventDetails;
