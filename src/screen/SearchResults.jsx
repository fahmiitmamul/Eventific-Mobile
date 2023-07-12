import React from 'react';
import {Appbar} from 'react-native-paper';
import styles from '../styles/global';
import HamburgerIcon from '../assets/images/hamburger.png';
import {View, StatusBar, Text, Image} from 'react-native';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faChevronDown,
  faChevronUp,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import http from '../helpers/http';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {useFocusEffect} from '@react-navigation/native';
import MessageRegular from '../assets/images/message-regular.png';
import NotificationController from '../helpers/notification';
import SelectDropdown from 'react-native-select-dropdown';

const SearchResults = ({route, navigation}) => {
  const token = useSelector(state => state.auth.token);
  const [events, setEvents] = React.useState([]);
  const [results, setResults] = React.useState('');
  const [page, setPage] = React.useState(2);

  async function getEvents(results) {
    const {data} = await http(token).get('/events?limit=20', {
      params: {search: results},
    });
    setEvents(data.results);
  }

  async function getEventsLimit(limits) {
    const {data} = await http(token).get('/events', {
      params: {limit: limits},
    });

    setEvents(data.results);
  }

  const getPaginatedEvents = React.useCallback(async () => {
    const {data} = await http(token).get('/events', {
      params: {
        page,
      },
    });
    setEvents(data.results);
  }, [page, token]);

  function incrementPage() {
    setPage(page + 1);
    if (page === 10) {
      setPage(10);
    }
    console.log(page);
  }

  function decrementPage() {
    setPage(page - 1);
    if (page === 1) {
      setPage(1);
    }
    console.log(page);
  }

  async function getEventsSort(sort) {
    const {data} = await http(token).get('/events', {
      params: {sortBy: sort},
    });

    setEvents(data.results);
  }

  useFocusEffect(
    React.useCallback(() => {
      getEvents(results);
    }, [getEvents, results]),
  );

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

  const profession = ['1', '2', '3', '4', '5'];
  const sorts = ['ASC', 'DESC'];

  return (
    <React.Fragment>
      <NotificationController />
      <StatusBar animated={true} backgroundColor="#19A7CE" />
      <View style={{width: '100%', height: '100%', backgroundColor: '#19A7CE'}}>
        <Appbar.Header style={styles.HomeHeaderStyle}>
          <Appbar.BackAction
            onPress={() => {
              navigation.navigate('Home');
            }}
            color="white"
          />
          <Appbar.Content
            titleStyle={{fontFamily: 'Poppins-Medium', paddingLeft: 70}}
          />
        </Appbar.Header>
        <View style={styles.TextInputWrapper}>
          <View style={styles.TextInputChildWrapper}>
            <TextInput
              style={styles.SearchInput}
              placeholder="Search Event"
              placeholderTextColor="white"
              onChangeText={ev => {
                setResults(ev);
                getEventByName(results);
              }}
              onEndEditing={() => getEventByName()}
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
            <Text style={styles.EventsTextStyle}>Limit :</Text>
            <SelectDropdown
              data={profession}
              defaultButtonText="10"
              dropdownStyle={{backgroundColor: '#EFEFEF'}}
              buttonStyle={{
                width: '25%',
                height: 40,
                backgroundColor: '#FFF',
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#19a7ce',
                fontFamily: 'Poppins-Medium',
              }}
              buttonTextStyle={{
                color: '#444',
                textAlign: 'left',
                fontFamily: 'Poppins-Medium',
                padding: 6,
              }}
              renderDropdownIcon={isOpened => {
                return (
                  <FontAwesomeIcon
                    icon={isOpened ? faChevronUp : faChevronDown}
                    color={'#444'}
                    size={18}
                  />
                );
              }}
              rowStyle={{
                backgroundColor: '#EFEFEF',
                borderBottomColor: '#C5C5C5',
              }}
              rowTextStyle={{
                color: '#444',
                textAlign: 'left',
                fontFamily: 'Poppins-Regular',
              }}
              onSelect={selectedItem => {
                getEventsLimit(selectedItem);
                return selectedItem;
              }}
              buttonTextAfterSelection={selectedItem => {
                return selectedItem;
              }}
              rowTextForSelection={item => {
                return item;
              }}
            />
          </View>
          <View style={styles.EventsWrapperStyle}>
            <Text style={styles.EventsTextStyle}>Sort By :</Text>
            <SelectDropdown
              data={sorts}
              defaultButtonText="ASC"
              dropdownStyle={{backgroundColor: '#EFEFEF'}}
              buttonStyle={{
                width: '40%',
                height: 40,
                backgroundColor: '#FFF',
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#19a7ce',
                fontFamily: 'Poppins-Medium',
              }}
              buttonTextStyle={{
                color: '#444',
                textAlign: 'left',
                fontFamily: 'Poppins-Medium',
                padding: 6,
              }}
              rowStyle={{
                backgroundColor: '#EFEFEF',
                borderBottomColor: '#C5C5C5',
              }}
              rowTextStyle={{
                color: '#444',
                textAlign: 'left',
                fontFamily: 'Poppins-Regular',
              }}
              renderDropdownIcon={isOpened => {
                return (
                  <FontAwesomeIcon
                    icon={isOpened ? faChevronUp : faChevronDown}
                    color={'#444'}
                    size={18}
                  />
                );
              }}
              onSelect={selectedItem => {
                getEventsSort(selectedItem);
                return selectedItem;
              }}
              buttonTextAfterSelection={selectedItem => {
                return selectedItem;
              }}
              rowTextForSelection={item => {
                return item;
              }}
            />
          </View>
          <View style={styles.EventsWrapperStyle}>
            <Text style={styles.EventsTextStyle}>
              Search Results : {results}
            </Text>
            <View style={{display: 'flex', flexDirection: 'row', gap: 10}}>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderRadius: 5,
                  padding: 10,
                  borderColor: '#19a7ce',
                }}
                onPress={() => {
                  decrementPage();
                  getPaginatedEvents(page);
                }}>
                <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderRadius: 5,
                  padding: 10,
                  borderColor: '#19a7ce',
                }}
                onPress={() => {
                  incrementPage();
                  getPaginatedEvents(page);
                }}>
                <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
              </TouchableOpacity>
            </View>
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
        </ScrollView>
      </View>
    </React.Fragment>
  );
};

export default SearchResults;
