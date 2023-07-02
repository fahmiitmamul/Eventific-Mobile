import React from 'react';
import {Appbar} from 'react-native-paper';
import {View, Text} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHeart} from '@fortawesome/free-solid-svg-icons';
import {useSelector} from 'react-redux';
import styles from '../styles/global';
import HamburgerIcon from '../assets/images/hamburger.png';
import http from '../helpers/http';
import moment from 'moment';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

const ManageEvent = ({navigation}) => {
  const token = useSelector(state => state.auth.token);
  const [events, setEvents] = React.useState([]);

  React.useEffect(() => {
    async function getEvents() {
      const {data} = await http(token).get('/events?limit=20');
      setEvents(data.results);
    }

    getEvents();
  }, []);

  const handleDelete = async itemId => {
    try {
      await http(token).delete(`/events/manage/${itemId}`);
      setEvents(events.filter(e => e.id !== itemId));
    } catch (err) {
      const message = err?.response?.data?.message;
      if (message) {
        console.warn(message);
      }
    }
  };

  return (
    <View style={styles.AppWrapper}>
      <Appbar.Header style={styles.ScrollViewStyle}>
        <Appbar.Action
          color="black"
          icon={HamburgerIcon}
          onPress={() => {
            navigation.openDrawer();
          }}
        />
        <Appbar.Content
          titleStyle={styles.ManageHeaderStyle}
          title="Manage Event"
        />
      </Appbar.Header>
      <View>
        <TouchableOpacity
          style={{
            backgroundColor: '#19a7ce',
            width: 100,
            margin: 20,
            padding: 10,
            borderRadius: 10,
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-Medium',
              color: 'white',
              paddingTop: 3,
              textAlign: 'center',
            }}
            onPress={() => {
              navigation.navigate('Create Event');
            }}>
            Create
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {events.map(e => {
          return (
            <View key={e.id}>
              <View style={styles.ManageWrapperStyle}>
                <View style={styles.ManageWrapperChildStyle}>
                  <View style={styles.DateWrapper}>
                    <Text style={styles.TextDate}>
                      {moment(e.date).format('DD')}
                    </Text>
                    <Text style={styles.FontStyle}>
                      {moment(e.date).format('ddd')}
                    </Text>
                  </View>
                  <View style={styles.HeartWrapper}>
                    <FontAwesomeIcon
                      icon={faHeart}
                      size={30}
                      color="#3366ff"></FontAwesomeIcon>
                  </View>
                </View>
                <View style={styles.TitleWrapper}>
                  <View>
                    <Text style={styles.TitleStyles}>{e.title}</Text>
                  </View>
                  <View>
                    <View>
                      <Text style={styles.FontStyle}>{e.location}</Text>
                    </View>
                    <View>
                      <Text style={styles.FontStyle}>
                        {moment(e.date).format('LLLL')}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{display: 'flex', flexDirection: 'row', gap: 10}}>
                    <Text
                      style={{fontFamily: 'Poppins-Medium', color: '#3366ff'}}>
                      Detail
                    </Text>
                    <Text
                      style={{fontFamily: 'Poppins-Medium', color: '#3366ff'}}>
                      Update
                    </Text>
                    <Text
                      onPress={() => handleDelete(e.id)}
                      style={{fontFamily: 'Poppins-Medium', color: '#3366ff'}}>
                      Delete
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default ManageEvent;
