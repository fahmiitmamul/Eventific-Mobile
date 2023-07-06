import {Appbar} from 'react-native-paper';
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Touchable} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/global';
import HamburgerIcon from '../assets/images/hamburger.png';
import {useFocusEffect} from '@react-navigation/native';
import http from '../helpers/http';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {ScrollView} from 'react-native-gesture-handler';
import {Modal, Pressable} from 'react-native';

const MyWishlists = ({navigation}) => {
  const [wishlist, setWishlist] = useState([]);
  const token = useSelector(state => state.auth.token);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteWishlist, setDeleteWishlist] = useState([]);

  function openModal(itemId) {
    const wishlistId = itemId;
    setModalVisible(!modalVisible);
    setDeleteWishlist(wishlistId);
  }

  useFocusEffect(
    React.useCallback(() => {
      async function getWishlists() {
        try {
          const {data} = await http(token).get('/wishlist');
          setWishlist(data.results);
        } catch (err) {
          console.warn(err);
        }
      }

      getWishlists();
    }, []),
  );

  const performDelete = async itemId => {
    try {
      const {data} = await http(token).delete(`/wishlist/${itemId}`);
      setWishlist(wishlist.filter(w => w.id !== itemId));
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
          title="My Wishlists"
        />
      </Appbar.Header>
      <ScrollView>
        {wishlist.map(w => {
          return (
            <View style={styles.ManageWrapperStyle} key={w.id}>
              <View style={styles.ManageWrapperChildStyle}>
                <View style={styles.DateWrapper}>
                  <Text style={styles.TextDate}>
                    {moment(w.date).format('DD')}
                  </Text>
                  <Text style={styles.FontStyle}>
                    {moment(w.date).format('ddd')}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.HeartWrapper}
                  onPress={() => {
                    openModal(w.id);
                  }}>
                  <FontAwesomeIcon
                    icon={faXmark}
                    size={30}
                    color="red"></FontAwesomeIcon>
                </TouchableOpacity>
              </View>
              <View style={styles.TitleWrapper}>
                <View>
                  <Text style={styles.TitleStyles}>{w.title}</Text>
                </View>
                <View>
                  <View>
                    <Text style={styles.FontStyle}>{w.location}</Text>
                  </View>
                  <View>
                    <Text style={styles.FontStyle}>
                      {moment(w.date).format('LLL')}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
        {wishlist.length <= 0 && (
          <View>
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
                fontSize: 20,
                textAlign: 'center',
                marginTop: 20,
              }}>
              No wishlist found
            </Text>
          </View>
        )}
      </ScrollView>
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
              Are you sure want to delete this wishlist ?
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
                }}
                onPress={() => {
                  performDelete(deleteWishlist);
                  setModalVisible(!modalVisible);
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Medium',
                    color: 'white',
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
                }}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Medium',
                    color: 'white',
                  }}>
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

export default MyWishlists;
