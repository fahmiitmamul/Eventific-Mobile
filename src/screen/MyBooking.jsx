import {Appbar} from 'react-native-paper';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from '../styles/global';

const MyBooking = () => {
  return (
    <View style={styles.AppWrapper}>
      <Appbar.Header style={styles.ScrollViewStyle}>
        <Appbar.BackAction onPress={() => {}} />
        <Appbar.Content
          titleStyle={styles.ManageHeaderStyle}
          title="My Booking"
        />
      </Appbar.Header>
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
