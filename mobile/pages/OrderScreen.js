import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Layout} from '@ui-kitten/components';
import OrderForm from '../ui/order/OrderForm';

const OrderScreen = ({navigation}) => {
  return (
    <Layout style={styles.orderScreen} level="3">
      <OrderForm navigation={navigation} />
    </Layout>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  orderScreen: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    flex: 1,
  },
});
