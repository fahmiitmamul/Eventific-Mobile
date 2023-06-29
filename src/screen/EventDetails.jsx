import {View, Text} from 'react-native';
import React from 'react';
import {Appbar} from 'react-native-paper';
import styles from '../styles/global';
import HamburgerIcon from '../assets/images/hamburger.png';

const EventDetails = ({navigation}) => {
  return (
    <View>
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
    </View>
  );
};

export default EventDetails;
