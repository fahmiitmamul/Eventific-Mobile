import {View, Text, Image} from 'react-native';
import React from 'react';
import {Appbar, Button} from 'react-native-paper';
import styles from '../styles/global';
import HamburgerIcon from '../assets/images/hamburger.png';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArrowRight,
  faClock,
  faLocation,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import {getAccordionColors} from 'react-native-paper/lib/typescript/src/components/List/utils';
import {ScrollView} from 'react-native-gesture-handler';

const EventDetails = ({navigation}) => {
  return (
    <ScrollView>
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
          title="Event Detail"
        />
      </Appbar.Header>
      <View>
        <View style={{position: 'relative'}}>
          <View
            style={{
              overflow: 'hidden',
            }}>
            <Image
              source={require('../assets/images/jakarta.jpg')}
              style={{height: 400}}
            />
          </View>
          <View
            style={{
              position: 'absolute',
              backgroundColor: 'black',
              opacity: 0.5,
              width: '100%',
              height: '100%',
            }}></View>
          <View style={{position: 'absolute', top: 200, margin: 20}}>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Poppins-Medium',
                fontSize: 25,
              }}>
              Sights & Sounds Exhibition
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}>
              <FontAwesomeIcon icon={faLocation} color="white" />
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Poppins-Regular',
                }}>
                Jakarta, Indonesia
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}>
              <FontAwesomeIcon icon={faClock} color="white" />
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Poppins-Regular',
                }}>
                Wed, 15 Nov, 4:00 PM
              </Text>
            </View>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                color: 'white',
                fontSize: 20,
              }}>
              Attendees
            </Text>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <View
                style={{
                  overflow: 'hidden',
                  borderRadius: 100,
                  width: 40,
                }}>
                <Image
                  source={require('../assets/images/attendes-1.jpg')}
                  style={{width: 40, height: 40}}
                />
              </View>
              <View
                style={{
                  overflow: 'hidden',
                  borderRadius: 100,
                  width: 40,
                  marginLeft: -13,
                }}>
                <Image
                  source={require('../assets/images/attendes-2.jpg')}
                  style={{width: 40, height: 40}}
                />
              </View>
              <View
                style={{
                  overflow: 'hidden',
                  borderRadius: 100,
                  width: 40,
                  marginLeft: -13,
                }}>
                <Image
                  source={require('../assets/images/attendes-3.jpg')}
                  style={{width: 40, height: 40}}
                />
              </View>
              <View
                style={{
                  overflow: 'hidden',
                  borderRadius: 100,
                  width: 40,
                  marginLeft: -13,
                }}>
                <Image
                  source={require('../assets/images/attendes-4.jpg')}
                  style={{width: 40, height: 40}}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={{margin: 20}}>
          <View>
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
                fontSize: 20,
                color: 'black',
              }}>
              Event Detail
            </Text>
            <Text style={{fontFamily: 'Poppins-Regular'}}>
              After his controversial art exhibition "Tear and Consume" back in
              November 2018, in which guests were invited to tear up…
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                color: '#3366ff',
                fontSize: 13,
              }}>
              Read More
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
                fontSize: 20,
                color: 'black',
                marginTop: 10,
              }}>
              Location
            </Text>
            <Image source={require('../assets/images/maps.png')} />
          </View>
          <View style={{marginTop: 30}}>
            <Button
              style={{
                backgroundColor: '#19a7ce',
                borderRadius: 8,
                padding: 8,
              }}>
              <Text style={{color: 'white', fontFamily: 'Poppins-Medium'}}>
                Buy Tickets
              </Text>
            </Button>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default EventDetails;
