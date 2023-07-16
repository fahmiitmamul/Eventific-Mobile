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
      <View style={styles.CreateEventWrapper}>
        <Appbar.Header style={styles.HomeHeaderStyle}>
          <Appbar.BackAction
            onPress={() => {
              navigation.navigate('Home');
            }}
            color="white"
          />
          <Appbar.Content titleStyle={styles.CreateEventAppbar} />
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
        <View style={styles.ProfileWrapperStyle}>
          <View style={styles.EventsWrapperStyle}>
            <Text style={styles.EventsTextStyle}>Limit :</Text>
            <SelectDropdown
              data={profession}
              defaultButtonText="10"
              dropdownStyle={styles.DropdownStyle}
              buttonStyle={styles.LimitDropdownStyle}
              buttonTextStyle={styles.LimitBtnTextStyle}
              renderDropdownIcon={isOpened => {
                return (
                  <FontAwesomeIcon
                    icon={isOpened ? faChevronUp : faChevronDown}
                    color={'#444'}
                    size={18}
                  />
                );
              }}
              rowStyle={styles.DropdownRowStyle}
              rowTextStyle={styles.DropdownRowTextStyle}
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
              dropdownStyle={styles.DropdownStyle}
              buttonStyle={styles.SortBtnStyle}
              buttonTextStyle={styles.LimitBtnTextStyle}
              rowStyle={styles.DropdownRowStyle}
              rowTextStyle={styles.DropdownRowTextStyle}
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
            <View style={styles.ProfileValueWrapper}>
              <TouchableOpacity
                style={styles.PageInfoStyle}
                disabled={events.results?.pageInfo?.page <= 1}
                onPress={() =>
                  getEventsPaginated(events.results?.pageInfo?.page - 1, '')
                }>
                <FontAwesomeIcon icon={faArrowLeft} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.PageInfoSecondStyle}
                disabled={
                  events.results?.pageInfo?.page ===
                  events.results?.pageInfo?.totalPage
                }
                onPress={() =>
                  getEventsPaginated(events.results?.pageInfo?.page + 1, '')
                }>
                <FontAwesomeIcon icon={faArrowRight} />
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            data={events.results?.rows}
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
          />
        </View>
      </View>
    </React.Fragment>
  );
};

export default SearchResults;
