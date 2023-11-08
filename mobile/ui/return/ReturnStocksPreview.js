import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import SummaryCard from '../../shared/ui/SummaryCard';
import OrderSearch from '../orderstocks/OrderSearch';
import OrdersList from '../../shared/ui/OrdersList';
import OrderFooter from '../orderstocks/OrderFooter';
import {getUser} from '../../app.storage';

const ReturnStocksPreview = ({route, navigation}) => {
  const {selIndent, editedStocks, vehicle} = route.params;
  const [stocks, setStocks] = useState(editedStocks);
  const [filteredStocks, setFilteredStocks] = useState(editedStocks);
  const [previewCardItems, setPreviewCardItems] = useState([
    {label: 'Indent No', value: selIndent.indentNo},
    {label: 'Vehicle Number', value: vehicle},
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

  const nextHandler = () => {
    getUser().then(value => {
      const user = JSON.parse(value);
      const returnIndent = {
        indentId: selIndent._id,
        vehicle: vehicle,
        indentType: 1,
        requestor: user._id,
        name: selIndent.indentNo,
        workorder: selIndent.workorder,
        supervisor: selIndent.supervisor,
        returnStocks: stocks.map(stock => {
          return {
            stockId: stock.id,
            returnQuantity: stock.stockRequested,
            acceptedQuantity: 0,
          };
        }),
      };

      navigation.push('ReturnBooking', {returnIndent});
    });
  };

  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <SummaryCard items={previewCardItems} />
      </View>
      <View style={styles.content}>
        <OrderSearch onSearch={onSearch} />

        <OrdersList stocks={filteredStocks} isEditable={false} />
      </View>
      <View style={styles.footer}>
        <OrderFooter btnText="Place Return" onClick={nextHandler} />
      </View>
    </View>
  );
};

export default ReturnStocksPreview;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
  },
  header: {
    flex: 1,
    marginBottom: 10,
  },
  content: {
    flex: 8,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  footer: {
    flex: 1,
  },
});
