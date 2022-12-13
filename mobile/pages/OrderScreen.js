import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Layout} from '@ui-kitten/components';
import OrderForm from '../ui/order/OrderForm';

const OrderScreen = ({navigation}) => {
  return (
    <View style={styles.orderScreen}>
      <OrderForm navigation={navigation} />
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  orderScreen: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    flex: 1,
    backgroundColor: '#ebecf0',
  },
});
