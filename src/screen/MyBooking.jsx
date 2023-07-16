import React from 'react';
import styles from '../styles/global';
import http from '../helpers/http';
import moment from 'moment';
import {Appbar} from 'react-native-paper';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';

const HistoryData = ({item}) => {
  return (
    <View key={item.id}>
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
              <Text style={styles.FontStyle}>{item.name}</Text>
            </View>
            <View>
              <Text style={styles.FontStyle}>
                {moment(item.date).format('LLLL')}
              </Text>
            </View>
            <View>
              <TouchableOpacity>
                <Text style={styles.ManageBtn}>Detail</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const MyBooking = ({navigation}) => {
  const [history, setHistory] = React.useState([]);
  const token = useSelector(state => state.auth.token);

  useFocusEffect(
    React.useCallback(() => {
      async function getWishlist() {
        const {data} = await http(token).get('/history');
        setHistory(data.results);
      }

      getWishlist();
    }, [token]),
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
          title="My Booking"
        />
      </Appbar.Header>
      <View style={styles.BookingWrapper}>
        <TouchableOpacity style={styles.BookingBtnStyle}>
          <Text style={styles.BookingCreateStyle}>Create</Text>
        </TouchableOpacity>
        <FlatList
          style={styles.BookingFlatlistStyle}
          data={history}
          keyExtractor={item => item.id}
          ListEmptyComponent={
            <View>
              <Text style={styles.FlatListEmptyStyle}>
                No Booking was found
              </Text>
            </View>
          }
          renderItem={({item}) => {
            return <HistoryData item={item} />;
          }}
        />
      </View>
    </View>
  );
};

export default MyBooking;
