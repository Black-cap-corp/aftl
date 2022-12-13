import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ReturnBooking from '../ui/return/ReturnBooking';

const ReturnBookingScreen = ({route, navigation}) => {
  return (
    <View style={{flex: 1}}>
      <ReturnBooking route={route} navigation={navigation} />
    </View>
  );
};

export default ReturnBookingScreen;

const styles = StyleSheet.create({});
