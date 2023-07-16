import React from 'react';
import moment from 'moment';
import styles from '../styles/global';
import http from '../helpers/http';
import {Appbar} from 'react-native-paper';
import {View, Text, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';
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
        setEvents(data.results.rows);
      }

      getEvents();
    }, [token]),
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
      <View style={styles.ManageWrapper}>
        <View>
          <TouchableOpacity style={styles.CreateBtnStyle}>
            <Text
              style={styles.CreateTextStyle}
              onPress={() => {
                navigation.navigate('Create Event');
              }}>
              Create
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={events}
          keyExtractor={item => item.id}
          ListEmptyComponent={
            <View>
              <Text style={styles.FlatListEmptyStyle}>
                No events found, please create events
              </Text>
            </View>
          }
          renderItem={({item}) => {
            return (
              <View>
                <View style={styles.ManageWrapperStyle}>
                  <View style={styles.ManageWrapperChildStyle}>
                    <View style={styles.DateWrapper}>
                      <Text style={styles.TextDate}>
                        {moment(item.date).format('DD')}
                      </Text>
                      <Text style={styles.FontStyle}>
                        {moment(item.date).format('ddd')}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.TitleWrapper}>
                    <View>
                      <Text style={styles.TitleStyles}>{item.title}</Text>
                    </View>
                    <View>
                      <View>
                        <Text style={styles.FontStyle}>{item.location}</Text>
                      </View>
                      <View>
                        <Text style={styles.FontStyle}>
                          {moment(item.date).format('LLLL')}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.ProfileValueWrapper}>
                      <Text style={styles.EditBtnStyle}>Detail</Text>
                      <Text
                        onPress={() =>
                          navigation.navigate('Update Event', {
                            eventId: item.id,
                          })
                        }
                        style={styles.EditBtnStyle}>
                        Update
                      </Text>
                      <Text
                        onPress={() => openModal(item.id)}
                        style={styles.EditBtnStyle}>
                        Delete
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.DeleteModalWrapper}>
          <View style={styles.DeleteModalSecondWrapper}>
            <Text style={styles.DeleteModalTextStyle}>
              Are you sure want to delete this event ?
            </Text>
            <View style={styles.DocumentSelectWrapper}>
              <TouchableOpacity style={styles.DeleteWrapperStyle}>
                <Text
                  style={styles.SaveTextStyle}
                  onPress={() => {
                    handleDelete(deleteWishlist);
                    setModalVisible(!modalVisible);
                  }}>
                  Yes
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.NoBtnStyle}>
                <Text
                  style={styles.DeleteModalTextStyle}
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
