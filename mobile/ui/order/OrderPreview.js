import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import OrderPreviewSummary from './OrderPreviewSummary';
import OrderSearch from '../orderstocks/OrderSearch';
import OrderFooter from '../orderstocks/OrderFooter';
import OrdersList from '../../shared/ui/OrdersList';

const OrderPreview = ({route, navigation}) => {
  const workorder = route.params.workorder;
  const [stocks, setStocks] = useState(workorder.stocksRequested);
  const [filteredStocks, setFilteredStocks] = useState(
    workorder.stocksRequested,
  );
  const [previewCardItems, setPreviewCardItems] = useState([
    {label: 'Workorder No', value: workorder.name},
    {label: 'Contractor', value: workorder.contractor.contractor},
    {label: 'Vehicle Number', value: workorder.vehicle},
    {label: 'Location', value: workorder.location},
  ]);
  const onSearch = key => {
    if (key.trim() === '') {
      setFilteredStocks(stocks);
    } else {
      const filterStocks = stocks.filter(stock =>
        stock.name.toLowerCase().includes(key.toLowerCase()),
      );
      setFilteredStocks(filterStocks);
    }
  };

  const onSubmit = () => {
    navigation.navigate('Booking', {
      workorder,
    });
  };
  return (
    <View style={styles.page}>
      <View style={styles.header} level="1">
        <OrderPreviewSummary items={previewCardItems} />
      </View>
      <View>
        <OrderSearch onSearch={onSearch} />
      </View>
      <View style={styles.content}>
        <OrdersList stocks={filteredStocks} isEditable={false} />
      </View>
      <View>
        <OrderFooter onClick={onSubmit} btnText="Place Indent" />
      </View>
    </View>
  );
};

export default OrderPreview;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    flex: 1,
    marginBottom: 10,
  },
  content: {
    flex: 5,
    marginTop: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
  },
});
