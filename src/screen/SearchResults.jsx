import React from 'react';
import {Appbar} from 'react-native-paper';
import styles from '../styles/global';
import {View, StatusBar, Image, Text, FlatList} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
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
import NotificationController from '../helpers/notification';
import SelectDropdown from 'react-native-select-dropdown';
import LinearGradient from 'react-native-linear-gradient';

const SearchResults = ({navigation}) => {
  const token = useSelector(state => state.auth.token);
  const [events, setEvents] = React.useState([]);
  const [results, setResults] = React.useState('');

  async function getEventsLimit(limits) {
    const {data} = await http(token).get('/events', {
      params: {limit: limits},
    });

    setEvents(data);
  }

  async function getEventsSort(sort) {
    const {data} = await http(token).get('/events', {
      params: {sortBy: sort},
    });

    setEvents(data);
  }

  async function getEventsPaginated(page = 1, search = '') {
    try {
      const {data} = await http(token).get('/events', {
        params: {
          page: page,
          search: search,
        },
      });
      setEvents(data);
    } catch (err) {
      console.log(err.response.data);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      async function getEvents() {
        try {
          const {data} = await http(token).get('/events');
          setEvents(data);
        } catch (err) {
          console.log(err.response.data);
        }
      }
      getEvents();
    }, [token]),
  );

  async function getEventByName(search) {
    const eventdata = await http(token).get('/events?limit=20');
    const {data} = await http(token).get('/events', {
      params: {search: search},
    });
    if (search === '') {
      setEvents(eventdata.data);
    } else {
      setEvents(data);
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
        <View
          style={{
            backgroundColor: 'white',
            borderTopLeftRadius: 35,
            borderTopRightRadius: 35,
            width: '100%',
            height: '100%',
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
                disabled={events.results.pageInfo.page <= 1}
                onPress={() =>
                  getEventsPaginated(events.results.pageInfo.page - 1, '')
                }>
                <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderRadius: 5,
                  padding: 10,
                  borderColor: '#19a7ce',
                }}
                disabled={
                  events.results.pageInfo.page ===
                  events.results.pageInfo.totalPage
                }
                onPress={() =>
                  getEventsPaginated(events.results.pageInfo.page + 1, '')
                }>
                <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            data={events.results.rows}
            keyExtractor={item => item.id}
            horizontal
            renderItem={({item}) => {
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
          />
        </View>
      </View>
    </React.Fragment>
  );
};

export default SearchResults;
