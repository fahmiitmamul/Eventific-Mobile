import React from 'react';
import styles from '../styles/global';
import http from '../helpers/http';
import moment from 'moment';
import {Appbar} from 'react-native-paper';
import {View, Text, FlatList} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const WishlistData = ({item}) => {
  return (
    <View style={styles.ManageWrapperStyle}>
      <View style={styles.ManageWrapperChildStyle}>
        <View style={styles.DateWrapper}>
          <Text style={styles.TextDate}>{moment(item.date).format('DD')}</Text>
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
              {moment(item.date).format('LLL')}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const MyWishlists = ({navigation}) => {
  const token = useSelector(state => state.auth.token);
  const [wishlist, setWishlist] = React.useState([]);

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
      <FlatList
        style={{
          backgroundColor: 'white',
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
        }}
        data={wishlist}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return <WishlistData item={item} />;
        }}></FlatList>
    </View>
  );
};

export default MyWishlists;
