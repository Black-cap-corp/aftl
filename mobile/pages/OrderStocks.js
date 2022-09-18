import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Layout} from '@ui-kitten/components';
import OrderSearch from '../ui/orderstocks/OrderSearch';
import OrdersList from '../shared/ui/OrdersList';
import axios from 'axios';

const getStocks = async workorderId => {};

const OrderStocks = ({route, navigation}) => {
  console.log(route.params);
  React.useEffect(() => {});
  return (
    <Layout style={styles.page}>
      <Layout style={styles.header}>
        <OrderSearch />
      </Layout>
      <Layout style={styles.content}>
        <OrdersList />
      </Layout>
      <Layout style={styles.footer}>
        <Text>Footer</Text>
      </Layout>
    </Layout>
  );
};

export default OrderStocks;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flex: 1.5,
  },
  content: {
    flex: 8,
  },
  footer: {
    flex: 1,
  },
});
