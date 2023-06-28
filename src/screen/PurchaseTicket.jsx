import React from 'react';
import {Appbar, Button} from 'react-native-paper';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/global';
import HamburgerIcon from '../assets/images/hamburger.png';

const PurchaseTicket = ({navigation}) => {
  return (
    <View style={styles.ContentWrapper}>
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
          title="Checkout"
        />
      </Appbar.Header>
      <View style={styles.TicketImgWrapper}>
        <Image source={require('../assets/images/tickets.png')} />
      </View>
      <View style={styles.TicketWrapper}>
        <View style={styles.TitleWrapperStyle}>
          <View>
            <Text style={styles.TicketTitleStyle}>Tickets</Text>
          </View>
          <View style={styles.FilterWrapperStyle}>
            <Text style={styles.FilterTextStyle}>BY PRICE</Text>
            <Image source={require('../assets/images/filter.png')} />
          </View>
        </View>
        <View style={styles.TicketContentWrapper}>
          <View>
            <View style={styles.ProfileValueWrapper}>
              <Image source={require('../assets/images/ticket-section.png')} />
              <View style={styles.TicketSectionWrapper}>
                <View>
                  <Text style={styles.TicketSectionTextStyle}>
                    SECTION REG, ROW 1
                  </Text>
                  <Text style={{fontFamily: 'Poppins-Regular', fontSize: 10}}>
                    12 Seats Available
                  </Text>
                </View>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                  <Text style={styles.TicketSectionTextStyle}>$15</Text>
                  <Text style={{fontFamily: 'Poppins-Regular'}}>/person</Text>
                </View>
              </View>
            </View>
            <View style={styles.QuantityWrapper}>
              <View>
                <Text style={styles.QuantityTextStyle}>Quantity</Text>
              </View>
              <View style={styles.QuantityBtnWrapper}>
                <TouchableOpacity style={styles.QuantityBtn}>
                  <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                </TouchableOpacity>
                <Text style={{fontFamily: 'Poppins-Bold'}}>0</Text>
                <TouchableOpacity style={styles.QuantityBtn}>
                  <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.TicketContentWrapper}>
          <View>
            <View style={styles.ProfileValueWrapper}>
              <Image source={require('../assets/images/ticket-section.png')} />
              <View style={styles.TicketSectionWrapper}>
                <View>
                  <Text style={styles.TicketSectionTextStyle}>
                    SECTION REG, ROW 1
                  </Text>
                  <Text style={{fontFamily: 'Poppins-Regular', fontSize: 10}}>
                    12 Seats Available
                  </Text>
                </View>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                  <Text style={styles.TicketSectionTextStyle}>$15</Text>
                  <Text style={{fontFamily: 'Poppins-Regular'}}>/person</Text>
                </View>
              </View>
            </View>
            <View style={styles.QuantityWrapper}>
              <View>
                <Text style={styles.QuantityTextStyle}>Quantity</Text>
              </View>
              <View style={styles.QuantityBtnWrapper}>
                <TouchableOpacity style={styles.QuantityBtn}>
                  <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                </TouchableOpacity>
                <Text style={{fontFamily: 'Poppins-Bold'}}>0</Text>
                <TouchableOpacity style={styles.QuantityBtn}>
                  <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.TicketContentWrapper}>
          <View>
            <View style={styles.ProfileValueWrapper}>
              <Image source={require('../assets/images/ticket-section.png')} />
              <View style={styles.TicketSectionWrapper}>
                <View>
                  <Text style={styles.TicketSectionTextStyle}>
                    SECTION REG, ROW 1
                  </Text>
                  <Text style={{fontFamily: 'Poppins-Regular', fontSize: 10}}>
                    12 Seats Available
                  </Text>
                </View>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                  <Text style={styles.TicketSectionTextStyle}>$15</Text>
                  <Text style={{fontFamily: 'Poppins-Regular'}}>/person</Text>
                </View>
              </View>
            </View>
            <View style={styles.QuantityWrapper}>
              <View>
                <Text style={styles.QuantityTextStyle}>Quantity</Text>
              </View>
              <View style={styles.QuantityBtnWrapper}>
                <TouchableOpacity style={styles.QuantityBtn}>
                  <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                </TouchableOpacity>
                <Text style={{fontFamily: 'Poppins-Bold'}}>0</Text>
                <TouchableOpacity style={styles.QuantityBtn}>
                  <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PurchaseTicket;
