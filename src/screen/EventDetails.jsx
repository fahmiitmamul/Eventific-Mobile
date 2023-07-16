import React from 'react';
import moment from 'moment';
import http from '../helpers/http';
import SimpleLottie from '../components/LottieAnimation';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../styles/global';
import {View, Text, Image} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faClock,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {Modal} from 'react-native';
import {StatusBar} from 'react-native';
import {faHeart} from '@fortawesome/free-regular-svg-icons';
import {faHeart as FaHeartSolid} from '@fortawesome/free-solid-svg-icons';

const EventDetails = ({route, navigation}) => {
  const {id} = route.params;
  const [events, setEvents] = React.useState([]);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [profileId, setProfileId] = React.useState(null);
  const [added, setAdded] = React.useState(false);
  const token = useSelector(state => state.auth.token);

  useFocusEffect(
    React.useCallback(() => {
      async function getEventDetails() {
        const {data} = await http().get(`/events/${id}`);
        setEvents(data.results);
      }

      async function getProfile() {
        try {
          const {data} = await http(token).get('/profile');
          setProfileId(data.results.id);
        } catch (err) {
          console.log(err.response.data.message);
        }
      }

      async function getWishlistId() {
        try {
          const {data} = await http(token).get(`/wishlist/${id}`);
          const userId = data.results.userId;
          if (userId === profileId) {
            setAdded(true);
          }
        } catch (err) {
          console.log('Data not found');
        }
      }

      getProfile();
      getWishlistId();
      getEventDetails();
    }, [id, token, profileId]),
  );

  async function addWishlists() {
    try {
      const eventId = id;
      const body = new URLSearchParams({eventId}).toString();
      const {data} = await http(token).post('/wishlist', body);
      if (data) {
        setAdded(!added);
      }
    } catch (err) {
      console.warn(err.response?.data?.message);
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
    <ScrollView style={styles.ScrollViewWrapper}>
      <StatusBar
        animated={true}
        translucent={true}
        backgroundColor="#ffffff00"
      />
      <View style={styles.DetailImgWrapper}>
        <View style={styles.Relative}>
          <Image
            source={{
              uri: `https://res.cloudinary.com/dxnewldiy/image/upload/v1683808473/${events?.picture}`,
            }}
            style={styles.DetailImgStyle}
          />
          <LinearGradient
            start={{x: 0, y: 1}}
            end={{x: 0, y: 0}}
            colors={['#ffffff00', '#000000']}
            style={styles.LinearGradientStyle}
          />
          <View style={styles.DetailContentWrapper}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <FontAwesomeIcon icon={faArrowLeft} color="white" size={30} />
            </TouchableOpacity>
            <TouchableOpacity onPress={addWishlists}>
              <FontAwesomeIcon
                icon={added ? FaHeartSolid : faHeart}
                color="#19a7ce"
                size={30}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.DetailTextWrapper}>
          <Text style={styles.DetailTitleStyle}>{events?.title}</Text>
          <View style={styles.DetailLocationWrapper}>
            <FontAwesomeIcon icon={faLocationDot} color="white" />
            <Text style={styles.EventCatDateTextStyle}>{events?.location}</Text>
          </View>
          <View style={styles.DetailTimeWrapper}>
            <FontAwesomeIcon icon={faClock} color="white" />
            <Text style={styles.EventCatDateTextStyle}>
              {moment(events?.date).format('LL')}
            </Text>
          </View>
          <Text style={styles.AttendeeTextStyle}>Attendees</Text>
          <View style={styles.AttendeeWrapperStyle}>
            <View style={styles.AttendeeStyle}>
              <Image
                source={require('../assets/images/attendes-1.jpg')}
                style={styles.AttendeeImgStyle}
              />
            </View>
            <View style={styles.AttendeeStyle}>
              <Image
                source={require('../assets/images/attendes-2.jpg')}
                style={styles.AttendeeImgStyle}
              />
            </View>
            <View style={styles.AttendeeStyle}>
              <Image
                source={require('../assets/images/attendes-3.jpg')}
                style={styles.AttendeeImgStyle}
              />
            </View>
            <View style={styles.AttendeeStyle}>
              <Image
                source={require('../assets/images/attendes-4.jpg')}
                style={styles.AttendeeImgStyle}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.EventDetailStyle}>
        <View>
          <Text style={styles.EventDetailTextStyle}>Event Detail</Text>
          <Text style={styles.PoppinsRegular}>{events?.description}</Text>
          <Text style={styles.ReadMoreStyle}>Read More</Text>
        </View>
        <View>
          <Text style={styles.LocationTextStyle}>Location</Text>
          <Image source={require('../assets/images/maps.png')} />
        </View>
        <View style={styles.BuyTicketWrapper}>
          <TouchableOpacity onPress={makePayments} style={styles.BuyBtnStyle}>
            <Text style={styles.BuyBtnTextStyle}>Buy Tickets</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.ModalStyle}>
          <SimpleLottie />
        </View>
      </Modal>
    </ScrollView>
  );
};

export default EventDetails;
