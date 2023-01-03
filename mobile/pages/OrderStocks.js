import {StyleSheet, Text, View, BackHandler} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Layout} from '@ui-kitten/components';
import OrderSearch from '../ui/orderstocks/OrderSearch';
import OrdersList from '../shared/ui/OrdersList';
import axios from 'axios';
import {APP_BASE_URL} from '../app.const';
import OrderFooter from '../ui/orderstocks/OrderFooter';

const getStocks = async workorderId => {};

const OrderStocks = ({route, navigation}) => {
  const [stocks, setStocks] = useState([]);
  const [searchStocks, setSearchStocks] = useState([]);

  const handleBackPress = () => {
    navigation.goBack();
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
  }, []);

  React.useEffect(() => {
    axios.get(`${APP_BASE_URL}/stocks`).then(
      result => {
        const workorderStocks = route.params.stocks;
        const filterStocks = result.data.reduce(
          (filterStocks, currentStock) => {
            const workorderStock = workorderStocks.find(
              stock => stock.stockId === currentStock.id,
            );
            if (workorderStock) {
              const stockItem = {
                ...currentStock,
                limit: workorderStock.stock,
                stockRequested: 0,
              };
              filterStocks.push(stockItem);
            }
            return filterStocks;
          },
          [],
        );
        setStocks(filterStocks);
        setSearchStocks(filterStocks);
      },
      error => {
        console.log(error);
      },
    );
  }, []);

  const onSearch = key => {
    if (key.trim() === '') {
      setSearchStocks(stocks);
    } else {
      const filterStocks = stocks.filter(stock =>
        stock.name.toLowerCase().includes(key.toLowerCase()),
      );
      setSearchStocks(filterStocks);
    }
  };

  const onSubmit = () => {
    const workorder = route.params.workorder;
    const editEditedStocks = stocks.filter(
      stock => Number(stock.stockRequested) > 0,
    );
    navigation.push('OrderPreview', {
      isComplete: false,
      workorder: {...workorder, stocksRequested: editEditedStocks},
    });
  };
  return (
    <Layout style={styles.page}>
      <Layout style={styles.header}>
        <OrderSearch onSearch={onSearch} />
      </Layout>
      <Layout style={styles.content}>
        <OrdersList
          stocks={searchStocks}
          setStocks={setStocks}
          rawStocks={stocks}
          setSearchStocks={setSearchStocks}
        />
      </Layout>
      <Layout>
        <OrderFooter onClick={onSubmit} btnText="Preview Indent" />
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
    flexDirection: 'column',
    backgroundColor: '#ebecf0',
  },
  header: {
    flex: 1.5,
    backgroundColor: '#ebecf0',
  },
  content: {
    flex: 8,
    backgroundColor: '#ebecf0',
  },
  footer: {
    flex: 1,
    backgroundColor: '#ebecf0',
  },
});
