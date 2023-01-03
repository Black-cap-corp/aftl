import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import OrderSearch from '../orderstocks/OrderSearch';
import OrdersList from '../../shared/ui/OrdersList';
import OrderFooter from '../orderstocks/OrderFooter';
import axios from 'axios';
import {APP_BASE_URL} from '../../app.const';

const ReturnStocksEdit = ({route, navigation}) => {
  const [stocks, setStocks] = useState([]);
  const [searchStocks, setSearchStocks] = useState([]);
  const selIndent = route.params.selectedIndent;
  React.useEffect(() => {
    axios.get(`${APP_BASE_URL}/stocks`).then(
      result => {
        const indentStocks = selIndent.requestedStocks;
        const filterStocks = result.data.reduce(
          (filterStocks, currentStock) => {
            const indentStock = indentStocks.find(
              stock => stock.stockId === currentStock.id,
            );
            if (indentStock) {
              const stockItem = {
                ...currentStock,
                limit: indentStock.approvedQuantity,
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

  const proceedNextHandler = () => {
    const editedStocks = stocks.filter(stock => stock.stockRequested > 0);
    navigation.push('ReturnStocksPreview', {
      selIndent,
      editedStocks,
      vehicle: route.params.vehicle,
    });
  };

  return (
    <View style={styles.page}>
      <View style={{flex: 1.5}}>
        <OrderSearch />
      </View>
      <View style={{flex: 7.5}}>
        <OrdersList
          stocks={searchStocks}
          setStocks={setStocks}
          rawStocks={stocks}
          setSearchStocks={setSearchStocks}
        />
      </View>
      <View style={{flex: 1}}>
        <OrderFooter btnText="Review Return" onClick={proceedNextHandler} />
      </View>
    </View>
  );
};

export default ReturnStocksEdit;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    flexDirection: 'column',
    backgroundColor: '#ebecf0',
  },
});
