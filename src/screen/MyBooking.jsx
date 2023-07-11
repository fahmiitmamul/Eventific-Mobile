import {Appbar} from 'react-native-paper';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from '../styles/global';
import HamburgerIcon from '../assets/images/hamburger.png';
import {useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import http from '../helpers/http';
import {ScrollView} from 'react-native-gesture-handler';
import moment from 'moment';

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
    }, []),
  );

  return (
    <View style={styles.AppWrapper}>
      <Appbar.Header style={styles.ScrollViewStyle}>
        <Appbar.BackAction onPress={() => {}} color="white" />
        <Appbar.Content
          titleStyle={styles.ManageHeaderStyle}
          title="MyBooking"
        />
      </Appbar.Header>
      <ScrollView
        style={{
          backgroundColor: 'white',
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          paddingTop: 20,
        }}>
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
            }}>
            Create
          </Text>
        </TouchableOpacity>
        {history.map(item => {
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
        })}
      </ScrollView>
    </View>
  );
};

export default MyBooking;
