import React, {useState} from 'react';
import {Appbar, Button} from 'react-native-paper';
import styles from '../styles/global';
import SplashScreen from 'react-native-splash-screen';
import HamburgerIcon from '../assets/images/hamburger.png';
import {View, StatusBar, Text, Image} from 'react-native';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArrowRight,
  faSearch,
  faSliders,
} from '@fortawesome/free-solid-svg-icons';
import http from '../helpers/http';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {useFocusEffect} from '@react-navigation/native';
import MessageRegular from '../assets/images/message-regular.png';
import deviceToken from '../redux/reducers/deviceToken';

const Home = ({navigation}) => {
  const token = useSelector(state => state.auth.token);
  const fcmToken = useSelector(state => state.deviceToken.data);
  const [events, setEvents] = React.useState([]);
  const [eventCategories, setEventCategories] = React.useState([]);
  const [eventCategoriesData, setEventCategoriesData] = React.useState([]);
  const [search, setSearch] = React.useState('');

  const saveToken = React.useCallback(async () => {
    try {
      const form = new URLSearchParams({token: fcmToken}).toString();
      await http(token).post('/device-token', form);
    } catch (err) {
      console.log('Token already exist');
    }
  }, []);

  React.useEffect(() => {
    saveToken();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      SplashScreen.hide();

      async function getEvents() {
        const {data} = await http(token).get('/events?limit=20');
        setEvents(data.results);
      }

      getEvents();

      // if (search == '') {
      //   getEvents();
      // }
    }, []),
  );

  async function getEventByCategory(name) {
    const {data} = await http(token).get('/events', {params: {category: name}});
    setEventCategoriesData(data.results);
  }

  async function getEventByName(search) {
    const eventdata = await http(token).get('/events?limit=20');
    const {data} = await http(token).get('/events', {
      params: {search: search},
    });
    if (search === '') {
      setEvents(eventdata.data.results);
    } else {
      setEvents(data.results);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      async function getEventCategories() {
        let {data} = await http(token).get('/categories?limit=7');
        setEventCategories(data.results);
      }

      getEventCategories();
      getEventByCategory();
    }, []),
  );

  return (
    <React.Fragment>
      <StatusBar animated={true} backgroundColor="#19A7CE" />
      <View style={{width: '100%', height: '100%', backgroundColor: '#19A7CE'}}>
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
          <View style={styles.TextInputChildWrapper}>
            <TextInput
              style={styles.SearchInput}
              placeholder="Search Event"
              placeholderTextColor="white"
              onChangeText={ev => setSearch(ev)}
              onSubmitEditing={() => getEventByName(search)}
              onBlur={() => getEventByName()}
            />
            <FontAwesomeIcon
              icon={faSearch}
              size={25}
              style={styles.IconSearchStyle}
            />
          </View>
        </View>
        <ScrollView
          style={{
            backgroundColor: 'white',
            borderTopLeftRadius: 35,
            borderTopRightRadius: 35,
          }}>
          <View style={styles.EventsWrapperStyle}>
            <Text style={styles.EventsTextStyle}>Events For You</Text>
            <FontAwesomeIcon icon={faSliders} color="#19a7ce" size={25} />
          </View>
          <ScrollView
            style={{
              height: 470,
              display: 'flex',
              flexDirection: 'row',
            }}
            horizontal={true}>
            {events.map(e => {
              return (
                <TouchableOpacity
                  key={e.id}
                  onPress={() => {
                    navigation.navigate('Detail Event', {
                      id: e.id,
                    });
                  }}>
                  <View
                    style={{margin: 20, position: 'relative', height: '100%'}}>
                    <View
                      style={{
                        overflow: 'hidden',
                        borderRadius: 25,
                      }}>
                      <Image
                        source={{
                          uri: `https://res.cloudinary.com/dxnewldiy/image/upload/v1683808473/${e.picture}`,
                        }}
                        style={{width: 300, height: 450}}
                      />
                    </View>
                    <View
                      style={{
                        position: 'absolute',
                        backgroundColor: 'black',
                        opacity: 0.5,
                        borderRadius: 25,
                        width: 300,
                        height: 451,
                      }}></View>
                    <View style={{position: 'absolute', top: 250, margin: 20}}>
                      <Text
                        style={{
                          color: 'white',
                          fontFamily: 'Poppins-Regular',
                        }}>
                        {moment(e.date).format('LLLL')}
                      </Text>
                      <Text
                        style={{
                          color: 'white',
                          fontFamily: 'Poppins-Medium',
                          fontSize: 25,
                        }}>
                        {e.title}
                      </Text>
                      <View
                        style={{
                          marginTop: 5,
                          backgroundColor: 'red',
                          width: 40,
                          borderRadius: 10,
                          padding: 5,
                        }}>
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
            })}
            {events.length <= 0 && (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Medium',
                    fontSize: 20,
                    marginLeft: 110,
                  }}>
                  No Events Found
                </Text>
              </View>
            )}
          </ScrollView>
          <View style={{margin: 20}}>
            <Text style={{fontFamily: 'Poppins-Medium', fontSize: 20}}>
              Discover
            </Text>
            <ScrollView horizontal={true}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 30,
                  height: 60,
                  marginLeft: 10,
                }}>
                {eventCategories.map(ev => {
                  return (
                    <View key={ev.id}>
                      <TouchableOpacity
                        style={{
                          width: 120,
                          height: 50,
                          borderRadius: 30,
                          elevation: 5,
                          shadowColor: '#52006A',
                          backgroundColor: 'white',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        onPress={() => getEventByCategory(ev.name)}>
                        <Text style={{fontFamily: 'Poppins-Medium'}}>
                          {ev.name}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          </View>
          <View style={{marginLeft: 20, marginRight: 20}}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{fontFamily: 'Poppins-Medium', fontSize: 20}}>
                Upcoming
              </Text>
              <Text style={{color: '#3366ff', fontFamily: 'Poppins-Regular'}}>
                See All
              </Text>
            </View>
            {eventCategoriesData.map(item => {
              return (
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginRight: 55,
                    gap: 18,
                  }}
                  key={item.id}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
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
                  <View style={{width: '100%'}}>
                    <View style={{position: 'relative'}}>
                      <View
                        style={{
                          overflow: 'hidden',
                          borderRadius: 25,
                        }}>
                        <Image
                          source={{
                            uri: `https://res.cloudinary.com/dxnewldiy/image/upload/v1683808473/${item.picture}`,
                          }}
                          style={{width: '100%', height: 450}}
                        />
                      </View>
                      <View
                        style={{
                          position: 'absolute',
                          backgroundColor: 'black',
                          opacity: 0.5,
                          borderRadius: 25,
                          width: '100%',
                          height: 451,
                        }}></View>
                      <View
                        style={{position: 'absolute', top: 250, margin: 20}}>
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
                          <FontAwesomeIcon
                            icon={faArrowRight}
                            color="white"
                            size={25}
                          />
                        </View>
                      </View>
                    </View>
                    <Button
                      style={{
                        backgroundColor: '#19a7ce',
                        borderRadius: 8,
                        marginTop: 10,
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
            })}
          </View>
        </ScrollView>
      </View>
    </React.Fragment>
  );
};

export default Home;
