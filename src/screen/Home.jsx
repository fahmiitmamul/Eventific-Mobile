import React from 'react';
import {Appbar, Button} from 'react-native-paper';
import styles from '../styles/global';
import SplashScreen from 'react-native-splash-screen';
import HamburgerIcon from '../assets/images/hamburger.png';
import {View, StatusBar, Text, Image, FlatList} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowRight, faSearch} from '@fortawesome/free-solid-svg-icons';
import http from '../helpers/http';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {useFocusEffect} from '@react-navigation/native';
import MessageRegular from '../assets/images/message-regular.png';
import NotificationController from '../helpers/notification';
import messaging from '@react-native-firebase/messaging';
import LinearGradient from 'react-native-linear-gradient';

const Home = ({navigation}) => {
  const token = useSelector(state => state.auth.token);
  const fcmToken = useSelector(state => state.deviceToken.data);
  const [events, setEvents] = React.useState([]);
  const [eventCategories, setEventCategories] = React.useState([]);
  const [eventCategoriesData, setEventCategoriesData] = React.useState([]);

  async function getEventByCategory(name) {
    const {data} = await http(token).get('/events', {params: {category: name}});
    setEventCategoriesData(data.results);
  }

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
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      async function getEventCategories() {
        let {data} = await http(token).get('/categories?limit=7');
        setEventCategories(data.results);
      }

      async function getEvents() {
        const {data} = await http(token).get('/events?limit=20');
        setEvents(data.results);
      }

      getEvents();
      getEventCategories();
      getEventByCategory();
    }, [token]),
  );

  const EventCategoriesData = ({item}) => {
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 30,
          backgroundColor: 'white',
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 20,
          }}>
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 5,
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
                color: '#FF8900',
                fontSize: 20,
              }}>
              {moment(item.date).format('DD')}
            </Text>
            <Text style={{fontFamily: 'Poppins-Regular'}}>
              {moment(item.date).format('ddd')}
            </Text>
          </View>
          <View
            style={{
              height: 430,
              width: 5,
              borderRightColor: '#C1C5D080',
              borderLeftWidth: 0,
              borderTopWidth: 0,
              borderBottomWidth: 0,
              borderWidth: 3,
              borderStyle: 'dotted',
            }}></View>
        </View>
        <View>
          <View style={{position: 'relative'}}>
            <View
              style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 40,
              }}>
              <Image
                source={{
                  uri: `https://res.cloudinary.com/dxnewldiy/image/upload/v1683808473/${item.picture}`,
                }}
                style={{width: 300, height: 450}}
              />
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1}}
                colors={['#ffffff00', '#000000']}
                style={{
                  position: 'absolute',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 5,
                  height: 450,
                  width: '100%',
                }}></LinearGradient>
            </View>
            <View style={{position: 'absolute', top: 250, margin: 20}}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Poppins-Regular',
                }}>
                {moment(item.date).format('LLL')}
              </Text>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Poppins-Medium',
                  fontSize: 25,
                }}>
                {item.title}
              </Text>
              <View
                style={{
                  marginTop: 5,
                  backgroundColor: 'red',
                  width: 40,
                  borderRadius: 10,
                  padding: 5,
                }}>
                <FontAwesomeIcon icon={faArrowRight} color="white" size={25} />
              </View>
            </View>
          </View>
          <Button
            style={{
              backgroundColor: '#19a7ce',
              borderRadius: 8,
              marginTop: 10,
              marginBottom: 20,
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                color: 'white',
              }}>
              Show All 5 Events
            </Text>
          </Button>
        </View>
      </View>
    );
  };

  const EventCategories = ({item}) => {
    return (
      <View>
        <TouchableOpacity
          style={{
            width: 120,
            height: 50,
            borderRadius: 20,
            borderWidth: 1,
            borderStyle: 'dotted',
            shadowColor: '#52006A',
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 20,
          }}
          onPress={() => getEventByCategory(item.name)}>
          <Text style={{fontFamily: 'Poppins-Medium'}}>{item.name}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const CategoriesData = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Detail Event', {
            id: item.id,
          });
        }}>
        <View style={{position: 'relative', marginLeft: 20}}>
          <View
            style={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: 40,
            }}>
            <Image
              source={{
                uri: `https://res.cloudinary.com/dxnewldiy/image/upload/v1683808473/${item.picture}`,
              }}
              style={{width: 300, height: 450}}
            />
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
              colors={['#ffffff00', '#000000']}
              style={{
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
                height: 450,
                width: '100%',
              }}></LinearGradient>
          </View>
          <View style={{position: 'absolute', top: 250, margin: 20}}>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Poppins-Regular',
              }}>
              {moment(item.date).format('LLLL')}
            </Text>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Poppins-Medium',
                fontSize: 25,
              }}>
              {item.title}
            </Text>
            <View
              style={{
                marginTop: 5,
                backgroundColor: 'red',
                width: 40,
                borderRadius: 10,
                padding: 5,
              }}>
              <FontAwesomeIcon icon={faArrowRight} color="white" size={25} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <React.Fragment>
      <NotificationController />
      <StatusBar animated={true} backgroundColor="#19A7CE" />
      <View
        style={{
          backgroundColor: '#19a7ce',
          width: '100%',
          height: '100%',
        }}>
        <FlatList
          data={eventCategoriesData}
          renderItem={EventCategoriesData}
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
                <Appbar.Content
                  titleStyle={{fontFamily: 'Poppins-Medium', paddingLeft: 70}}
                />
                <Appbar.Action color="white" icon={MessageRegular} />
              </Appbar.Header>
              <View style={styles.TextInputWrapper}>
                <View style={{position: 'relative'}}>
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
                    style={{
                      fontFamily: 'Poppins-Regular',
                      color: 'white',
                      position: 'absolute',
                      top: 7,
                      left: 50,
                      fontSize: 20,
                    }}
                    onPress={() => {
                      navigation.navigate('Search Results');
                    }}>
                    Search Event
                  </Text>
                </View>
              </View>
              <View
                style={{
                  backgroundColor: 'white',
                  borderTopLeftRadius: 40,
                  borderTopRightRadius: 40,
                }}>
                <View
                  style={{display: 'flex', flexDirection: 'column', gap: 25}}>
                  <View style={styles.EventsWrapperStyle}>
                    <Text style={styles.EventsTextStyle}>Events For You</Text>
                  </View>
                  <FlatList
                    data={events}
                    renderItem={CategoriesData}
                    keyExtractor={item => item.id}
                    horizontal
                  />
                  <View style={{marginHorizontal: 20}}>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Medium',
                        fontSize: 20,
                        marginBottom: 20,
                      }}>
                      Discover
                    </Text>
                    <FlatList
                      data={eventCategories}
                      renderItem={EventCategories}
                      keyExtractor={item => item.id}
                      horizontal
                    />
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginHorizontal: 20,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Medium',
                        fontSize: 20,
                        marginBottom: 20,
                      }}>
                      Upcoming
                    </Text>
                    <Text
                      style={{color: '#3366ff', fontFamily: 'Poppins-Regular'}}>
                      See All
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          }
        />
      </View>
    </React.Fragment>
  );
};

export default Home;
