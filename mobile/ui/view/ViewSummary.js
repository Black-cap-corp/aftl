import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import SummaryCard from '../../shared/ui/SummaryCard';
import OrderSearch from '../orderstocks/OrderSearch';
import ViewSummaryList from './ViewSummaryList';
import axios from 'axios';
import {APP_BASE_URL} from '../../app.const';
import moment from 'moment';

const ViewSummary = ({route, navigation}) => {
  const {selIndent, type} = route.params;
  const transcationTimeStamp = selIndent?.history?.find(
    his => his.statusCode == 1,
  )?.when;

  const [items, setItems] = useState(
    getItems(selIndent, type, transcationTimeStamp),
  );
  const [stocks, setStocks] = useState([]);
  const [filteredStocks, setFilteredStocks] = useState([]);

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

  useEffect(() => {
    axios.get(`${APP_BASE_URL}/stocks`).then(
      result => {
        console.log(result.data);
        const filterStocks = getStockItems(
          result.data,
          type == 0 ? selIndent.requestedStocks : selIndent.returnStocks,
          type,
        );
        setStocks(filterStocks);
        setFilteredStocks(filterStocks);
      },
      error => {
        console.log(error);
      },
    );
  }, []);

  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <SummaryCard items={items} />
      </View>
      <View>
        <OrderSearch onSearch={onSearch} />
      </View>
      <View style={styles.content}>
        <ViewSummaryList stocks={filteredStocks} />
      </View>
    </View>
  );
};

const getItems = (selIndent, type, transcationTimeStamp) => {
  const date = moment(new Date(transcationTimeStamp)).format(
    'DD-MM-YYYY hh:mm:A',
  );
  switch (type) {
    case 0:
      return [
        {label: 'Indent No', value: selIndent.indentNo},
        {label: 'Vehicle Number', value: selIndent.vehicle},
        {label: 'status', value: selIndent.status},
        {label: 'Approved', value: String(selIndent.approved)},
        {
          label: 'Date',
          value: date,
        },
      ];
    case 1:
      return [
        {label: 'Indent No', value: selIndent.indentNo},
        {label: 'Vehicle Number', value: selIndent.vehicle},
        {label: 'status', value: selIndent.status},
        {label: 'Approved', value: String(selIndent.approved)},
        {
          label: 'Date',
          value: date,
        },
      ];
  }
};

const getStockItems = (rawStocks, stocks, type) => {
  const filteredStocks = rawStocks.reduce((filteredStocks, currentStock) => {
    const displayStock = stocks?.find(
      stock => stock.stockId == currentStock.id,
    );
    if (displayStock) {
      const newDisplayStock = {
        name: currentStock.name,
        requestedQuantity:
          type == 0
            ? displayStock.requestedQuantity
            : displayStock.returnQuantity,
        approvedQuantity:
          type == 0
            ? displayStock.approvedQuantity
            : displayStock.acceptedQuantity,
      };

      filteredStocks.push(newDisplayStock);
    }
    return filteredStocks;
  }, []);
  return filteredStocks;
};

export default ViewSummary;

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
