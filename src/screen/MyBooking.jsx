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
        <Appbar.Action
          color="black"
          icon={HamburgerIcon}
          onPress={() => {
            navigation.openDrawer();
          }}
        />
        <Appbar.Content
          titleStyle={styles.ManageHeaderStyle}
          title="MyBooking"
        />
      </Appbar.Header>
      <ScrollView>
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
        {history.map(h => {
          return (
            <>
              <View style={styles.ManageWrapperStyle} key={h.id}>
                <View style={styles.ManageWrapperChildStyle}>
                  <View style={styles.DateWrapper}>
                    <Text style={styles.TextDate}>
                      {moment(h.date).format('DD')}
                    </Text>
                    <Text style={styles.FontStyle}>
                      {moment(h.date).format('ddd')}
                    </Text>
                  </View>
                </View>
                <View style={styles.TitleWrapper}>
                  <View>
                    <Text style={styles.TitleStyles}>{h.title}</Text>
                  </View>
                  <View>
                    <View>
                      <Text style={styles.FontStyle}>{h.name}</Text>
                    </View>
                    <View>
                      <Text style={styles.FontStyle}>
                        {moment(h.date).format('LLLL')}
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
            </>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default MyBooking;
