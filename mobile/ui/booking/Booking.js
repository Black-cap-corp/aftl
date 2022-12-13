import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import Lottie from 'lottie-react-native';
import assets from '../../assets';
import {Text} from '@ui-kitten/components';
import {getUser} from '../../app.storage';
import axios from 'axios';
import {APP_BASE_URL} from '../../app.const';

const Booking = ({route, navigation}) => {
  useEffect(() => {
    const workorder = route.params.workorder;

    getUser().then(value => {
      const user = JSON.parse(value);
      const request = {
        workorder: workorder.workorder,
        contractor: workorder.contractor._id,
        location: workorder.location,
        vehicle: workorder.vehicle,
        requestor: user._id,
        name: workorder.name,
        requestedStocks: workorder.stocksRequested.map(stock => {
          return {
            stockId: stock.id,
            requestedQuantity: stock.stockRequested,
            approvedQuantity: 0,
          };
        }),
      };

      axios.post(`${APP_BASE_URL}/indent/add`, request).then(
        response => {
          const {indentNo, workorder} = response.data;
          navigation.navigate('BookingSuccess', {
            title: indentNo,
            content: `Indent Created SuccessFully for ${workorder} Workorder`,
          });
        },
        error => {
          console.log('error', error);
          navigation.navigate('BookingFailure');
        },
      );
    });
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

export default Booking;

const styles = StyleSheet.create({
  bookingScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wait_icon: {
    height: 200,
    marginBottom: 30,
  },
});
