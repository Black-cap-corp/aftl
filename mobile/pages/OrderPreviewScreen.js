import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Layout} from '@ui-kitten/components';
import OrderPreview from '../ui/order/OrderPreview';

const OrderPreviewScreen = ({route, navigation}) => {
  return (
    <Layout style={styles.orderScreen}>
      <OrderPreview route={route} navigation={navigation} />
    </Layout>
  );
};

export default OrderPreviewScreen;

const styles = StyleSheet.create({
  orderScreen: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    flex: 1,
    backgroundColor: '#ebecf0',
  },
});
