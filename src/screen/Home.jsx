import React from 'react';
import http from '../helpers/http';
import moment from 'moment';
import MessageRegular from '../assets/images/message-regular.png';
import NotificationController from '../helpers/notification';
import messaging from '@react-native-firebase/messaging';
import styles from '../styles/global';
import SplashScreen from 'react-native-splash-screen';
import HamburgerIcon from '../assets/images/hamburger.png';
import LinearGradient from 'react-native-linear-gradient';
import {Appbar, Button} from 'react-native-paper';
import {View, StatusBar, Text, Image, FlatList} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowRight, faSearch} from '@fortawesome/free-solid-svg-icons';
import {useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';

const Home = ({navigation}) => {
  const [events, setEvents] = React.useState([]);
  const [eventCategories, setEventCategories] = React.useState([]);
  const [eventCategoriesData, setEventCategoriesData] = React.useState([]);
  const token = useSelector(state => state.auth.token);
  const fcmToken = useSelector(state => state.deviceToken.data);

  const getEventByCategory = React.useCallback(
    async function (name) {
      try {
        const {data} = await http(token).get('/events', {
          params: {category: name},
        });
        setEventCategoriesData(data.results.rows);
      } catch (err) {
        console.warn(err.response?.data?.message);
      }
    },
    [token],
  );

  const saveToken = React.useCallback(async () => {
    try {
      const form = new URLSearchParams({token: fcmToken}).toString();
      await http(token).post('/device-token', form);
    } catch (err) {
      console.log('Token already exist');
    }
  }, [fcmToken, token]);

  React.useEffect(() => {
    SplashScreen.hide();
    saveToken();
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in background', remoteMessage);
    });
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log(remoteMessage);
    });
    return unsubscribe;
  }, [saveToken]);

  useFocusEffect(
    React.useCallback(() => {
      async function getEventCategories() {
        try {
          let {data} = await http(token).get('/categories?limit=7');
          setEventCategories(data.results);
        } catch (err) {
          console.warn(err.response?.data?.message);
        }
      }

      async function getEvents() {
        try {
          const {data} = await http(token).get('/events?limit=20');
          setEvents(data.results.rows);
        } catch (err) {
          console.warn(err.response?.data?.message);
        }
      }

      getEvents();
      getEventCategories();
      getEventByCategory();
    }, [token, getEventByCategory]),
  );

  return (
    <React.Fragment>
      <NotificationController />
      <StatusBar animated={true} backgroundColor="#19A7CE" />
      <View style={styles.MainWrapper}>
        <View style={styles.MainSecondWrapper}>
          <FlatList
            data={eventCategoriesData}
            ListEmptyComponent={
              <View style={styles.FlatListEmptyWrapper}>
                <Text style={styles.FlatListEmptyStyle}>
                  No Upcoming Events was found
                </Text>
              </View>
            }
            renderItem={({item}) => {
              return (
                <View style={styles.EventCatWrapper}>
                  <View style={styles.EventCatSecondWrapper}>
                    <View style={styles.EventCatDateWrapper}>
                      <Text style={styles.EventCatDateStyle}>
                        {moment(item.date).format('DD')}
                      </Text>
                      <Text style={styles.FontStyle}>
                        {moment(item.date).format('ddd')}
                      </Text>
                    </View>
                    <View style={styles.EventCatDotStyle} />
                  </View>
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('Detail Event', {
                          id: item.id,
                        });
                      }}>
                      <View style={styles.EventsDataWrapper}>
                        <View style={styles.EventCatImageStyle}>
                          <Image
                            source={{
                              uri: `https://res.cloudinary.com/dxnewldiy/image/upload/v1683808473/${item.picture}`,
                            }}
                            style={styles.EventCatImg}
                          />
                          <LinearGradient
                            start={{x: 0, y: 0}}
                            end={{x: 0, y: 1}}
                            colors={['#ffffff00', '#000000']}
                            style={styles.LinearGradientStyle}
                          />
                        </View>
                        <View style={styles.EventCatTitleWrapper}>
                          <Text style={styles.EventCatDateTextStyle}>
                            {moment(item.date).format('LLLL')}
                          </Text>
                          <Text style={styles.EventCatTitleStyle}>
                            {item.title}
                          </Text>
                          <View style={styles.EventCatFaWrapper}>
                            <FontAwesomeIcon
                              icon={faArrowRight}
                              color="white"
                              size={25}
                            />
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                    <Button style={styles.EventCatBtnStyle}>
                      <Text style={styles.EventCatBtnTextStyle}>
                        Show All 5 Events
                      </Text>
                    </Button>
                  </View>
                </View>
              );
            }}
            keyExtractor={item => item.id}
            ListHeaderComponent={
              <View>
                <Appbar.Header style={styles.HomeHeaderStyle}>
                  <Appbar.Action
                    color="white"
                    icon={HamburgerIcon}
                    onPress={() => {
                      navigation.openDrawer();
                    }}
                  />
                  <Appbar.Content titleStyle={styles.HomeAppbar} />
                  <Appbar.Action color="white" icon={MessageRegular} />
                </Appbar.Header>
                <View style={styles.TextInputWrapper}>
                  <View style={styles.TextInputChildWrapper}>
                    <TouchableOpacity
                      style={styles.TextInputChildWrapper}
                      onPress={() => navigation.navigate('Search Results')}>
                      <View style={styles.SearchInput} />
                      <FontAwesomeIcon
                        icon={faSearch}
                        size={25}
                        style={styles.IconSearchStyle}
                      />
                    </TouchableOpacity>
                    <Text
                      style={styles.SearchStyle}
                      onPress={() => {
                        navigation.navigate('Search Results');
                      }}>
                      Search Event
                    </Text>
                  </View>
                </View>
                <View style={styles.MainEventsWrapper}>
                  <View style={styles.MainEventsSecondWrapper}>
                    <View style={styles.EventsWrapperStyle}>
                      <Text style={styles.EventsTextStyle}>Events For You</Text>
                    </View>
                    <FlatList
                      data={events}
                      ListEmptyComponent={
                        <View style={styles.FlatListWrapperStyle}>
                          <Text style={styles.FlatListEmptyStyle}>
                            No Events was found
                          </Text>
                        </View>
                      }
                      renderItem={({item}) => {
                        return (
                          <TouchableOpacity
                            onPress={() => {
                              navigation.navigate('Detail Event', {
                                id: item.id,
                              });
                            }}>
                            <View style={styles.EventsDataWrapper}>
                              <View style={styles.EventCatImageStyle}>
                                <Image
                                  source={{
                                    uri: `https://res.cloudinary.com/dxnewldiy/image/upload/v1683808473/${item.picture}`,
                                  }}
                                  style={styles.EventCatImg}
                                />
                                <LinearGradient
                                  start={{x: 0, y: 0}}
                                  end={{x: 0, y: 1}}
                                  colors={['#ffffff00', '#000000']}
                                  style={styles.LinearGradientStyle}
                                />
                              </View>
                              <View style={styles.EventCatTitleWrapper}>
                                <Text style={styles.EventCatDateTextStyle}>
                                  {moment(item.date).format('LLLL')}
                                </Text>
                                <Text style={styles.EventCatTitleStyle}>
                                  {item.title}
                                </Text>
                                <View style={styles.EventCatFaWrapper}>
                                  <FontAwesomeIcon
                                    icon={faArrowRight}
                                    color="white"
                                    size={25}
                                  />
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                        );
                      }}
                      keyExtractor={item => item.id}
                      horizontal
                    />
                    <View style={styles.DiscoverWrapperStyle}>
                      <Text style={styles.DiscoverTextStyle}>Discover</Text>
                      <FlatList
                        data={eventCategories}
                        renderItem={({item}) => {
                          return (
                            <View>
                              <TouchableOpacity
                                style={styles.EventCategoriesStyle}
                                onPress={() => getEventByCategory(item.name)}>
                                <Text style={styles.EventCategoriesItemStyle}>
                                  {item.name}
                                </Text>
                              </TouchableOpacity>
                            </View>
                          );
                        }}
                        keyExtractor={item => item.id}
                        horizontal
                      />
                    </View>
                    <View style={styles.UpcomingStyle}>
                      <Text style={styles.UpcomingTextStyle}>Upcoming</Text>
                      <Text style={styles.UpcomingBtnStyle}>See All</Text>
                    </View>
                  </View>
                </View>
              </View>
            }
          />
        </View>
      </View>
    </React.Fragment>
  );
};

export default Home;
