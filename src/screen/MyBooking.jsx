import {Appbar} from 'react-native-paper';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from '../styles/global';
import HamburgerIcon from '../assets/images/hamburger.png';

const MyBooking = ({navigation}) => {
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
      <View>
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
      </View>
      <View style={styles.ManageWrapperStyle}>
        <View style={styles.ManageWrapperChildStyle}>
          <View style={styles.DateWrapper}>
            <Text style={styles.TextDate}>15</Text>
            <Text style={styles.FontStyle}>Wed</Text>
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
            <View>
              <TouchableOpacity>
                <Text style={styles.ManageBtn}>Detail</Text>
              </TouchableOpacity>
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
            <View>
              <TouchableOpacity>
                <Text style={styles.ManageBtn}>Detail</Text>
              </TouchableOpacity>
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
            <View>
              <TouchableOpacity>
                <Text style={styles.ManageBtn}>Detail</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MyBooking;
