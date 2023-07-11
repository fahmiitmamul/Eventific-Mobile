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
          const {data} = await http(token).get('/wishlist/all');
          setWishlist(data.results);
        } catch (err) {
          console.warn(err.response?.data);
        }
      }

      getWishlists();
    }, []),
  );

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
          title="My Wishlists"
        />
      </Appbar.Header>
      <ScrollView
        style={{
          backgroundColor: 'white',
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
        }}>
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
    </View>
  );
};

export default MyWishlists;
