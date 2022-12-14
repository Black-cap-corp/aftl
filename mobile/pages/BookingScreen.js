import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Booking from '../ui/booking/Booking';

const BookingScreen = ({route, navigation}) => {
  return (
    <View style={{flex: 1}}>
      <Booking route={route} navigation={navigation} />
    </View>
  );
};

export default BookingScreen;

const styles = StyleSheet.create({});
