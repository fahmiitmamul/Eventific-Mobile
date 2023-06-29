import {Appbar} from 'react-native-paper';
import React from 'react';
import {View, Text} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHeart} from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/global';
import HamburgerIcon from '../assets/images/hamburger.png';

const MyWishlists = ({navigation}) => {
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
          title="Manage Event"
        />
      </Appbar.Header>
      <View style={styles.ManageWrapperStyle}>
        <View style={styles.ManageWrapperChildStyle}>
          <View style={styles.DateWrapper}>
            <Text style={styles.TextDate}>15</Text>
            <Text style={styles.FontStyle}>Wed</Text>
          </View>
          <View style={styles.HeartWrapper}>
            <FontAwesomeIcon
              icon={faHeart}
              size={30}
              color="#3366ff"></FontAwesomeIcon>
          </View>
        </View>
        <View style={styles.TitleWrapper}>
          <View>
            <Text style={styles.TitleStyles}>Sights & Sounds Exhibition</Text>
          </View>
          <View>
            <View>
              <Text style={styles.FontStyle}>Jakarta, Indonesia</Text>
            </View>
            <View>
              <Text style={styles.FontStyle}>Wed, 15 Nov, 4: 00 PM</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.ManageWrapperStyle}>
        <View style={styles.ManageWrapperChildStyle}>
          <View style={styles.DateWrapper}>
            <Text style={styles.TextDate}>15</Text>
            <Text style={styles.FontStyle}>Wed</Text>
          </View>
          <View style={styles.HeartWrapper}>
            <FontAwesomeIcon
              icon={faHeart}
              size={30}
              color="#3366ff"></FontAwesomeIcon>
          </View>
        </View>
        <View style={styles.TitleWrapper}>
          <View>
            <Text style={styles.TitleStyles}>Sights & Sounds Exhibition</Text>
          </View>
          <View>
            <View>
              <Text style={styles.FontStyle}>Jakarta, Indonesia</Text>
            </View>
            <View>
              <Text style={styles.FontStyle}>Wed, 15 Nov, 4: 00 PM</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MyWishlists;
