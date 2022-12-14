import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import Lottie from 'lottie-react-native';
import assets from '../../assets';
import {Text} from '@ui-kitten/components';
import {getUser} from '../../app.storage';
import axios from 'axios';
import {APP_BASE_URL} from '../../app.const';

const ReturnBooking = ({route, navigation}) => {
  useEffect(() => {
    const returnIndent = route.params.returnIndent;
    axios.post(`${APP_BASE_URL}/returnIndents/add`, returnIndent).then(
      response => {
        const {returnNo, indentNo} = response.data;
        navigation.navigate('BookingSuccess', {
          title: returnNo,
          content: `Return Created SuccessFully for ${indentNo} Indent`,
        });
      },
      error => {
        console.log('error', error);
        navigation.navigate('BookingFailure');
      },
    );
  }, []);
  return (
    <View style={styles.bookingScreen}>
      <Lottie
        style={styles.wait_icon}
        source={assets.lottieFiles.wait}
        autoPlay
        loop
      />
      <Text category="label">Please wait while we create a indent for you</Text>
    </View>
  );
};

export default ReturnBooking;

const styles = StyleSheet.create({});
