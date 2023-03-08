import {StyleSheet, BackHandler} from 'react-native';
import React, {useEffect} from 'react';
import {Layout} from '@ui-kitten/components';
import OrderPreview from '../ui/order/OrderPreview';

const OrderPreviewScreen = ({route, navigation}) => {
  const handleBackPress = () => {
    navigation.goBack(null);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
  }, []);
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
