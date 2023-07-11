import React from 'react';
import {Appbar} from 'react-native-paper';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import styles from '../styles/global';
import HamburgerIcon from '../assets/images/hamburger.png';
import http from '../helpers/http';
import moment from 'moment';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {useFocusEffect} from '@react-navigation/native';
import {Modal} from 'react-native';

const ManageEvent = ({navigation}) => {
  const token = useSelector(state => state.auth.token);
  const [events, setEvents] = React.useState([]);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [deleteWishlist, setDeleteWishlist] = React.useState([]);

  function openModal(itemId) {
    const wishlistId = itemId;
    setModalVisible(!modalVisible);
    setDeleteWishlist(wishlistId);
  }

  useFocusEffect(
    React.useCallback(() => {
      async function getEvents() {
        const {data} = await http(token).get('/events/manage?limit=20');
        setEvents(data.results);
      }

      getEvents();
    }, []),
  );

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
        <Appbar.BackAction
          onPress={() => {
            navigation.navigate('Home');
          }}
          color="white"
        />
        <Appbar.Content
          titleStyle={styles.ManageHeaderStyle}
          title="Manage Event"
        />
      </Appbar.Header>
      <View
        style={{
          backgroundColor: 'white',
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          width: '100%',
          height: '100%',
          paddingTop: 20,
        }}>
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
                        style={{
                          fontFamily: 'Poppins-Medium',
                          color: '#3366ff',
                        }}>
                        Detail
                      </Text>
                      <Text
                        onPress={() =>
                          navigation.navigate('Update Event', {
                            eventId: e.id,
                          })
                        }
                        style={{
                          fontFamily: 'Poppins-Medium',
                          color: '#3366ff',
                        }}>
                        Update
                      </Text>
                      <Text
                        onPress={() => openModal(e.id)}
                        style={{
                          fontFamily: 'Poppins-Medium',
                          color: '#3366ff',
                        }}>
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
      <Modal
        animationType="fade"
        transparent={true}
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
          <View
            style={{
              width: '80%',
              height: '20%',
              padding: 10,
              backgroundColor: '#19a7ce',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 20,
              borderRadius: 20,
              opacity: 1,
              elevation: 20,
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
                color: 'white',
                textAlign: 'center',
              }}>
              Are you sure want to delete this event ?
            </Text>
            <View style={{display: 'flex', flexDirection: 'row', gap: 20}}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#F24C3D',
                  width: 80,
                  height: 50,
                  borderRadius: 12,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Medium',
                    color: 'white',
                  }}
                  onPress={() => {
                    handleDelete(deleteWishlist);
                    setModalVisible(!modalVisible);
                  }}>
                  Yes
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: 'green',
                  width: 80,
                  height: 50,
                  borderRadius: 12,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Medium',
                    color: 'white',
                  }}
                  onPress={() => setModalVisible(!modalVisible)}>
                  No
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ManageEvent;
