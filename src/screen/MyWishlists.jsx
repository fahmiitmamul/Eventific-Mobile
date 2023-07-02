import {Appbar} from 'react-native-paper';
import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/global';
import HamburgerIcon from '../assets/images/hamburger.png';
import {useFocusEffect} from '@react-navigation/native';
import http from '../helpers/http';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {ScrollView} from 'react-native-gesture-handler';

const MyWishlists = ({navigation}) => {
  const [wishlist, setWishlist] = useState([]);
  const token = useSelector(state => state.auth.token);

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
                  onPress={() => performDelete(w.id)}>
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
    </View>
  );
};

export default MyWishlists;
