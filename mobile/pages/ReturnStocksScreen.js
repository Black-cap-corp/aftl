import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ReturnStocksEdit from '../ui/return/ReturnStocksEdit';

const ReturnStocksScreen = ({route, navigation}) => {
  return (
    <View style={{flex: 1}}>
      <ReturnStocksEdit route={route} navigation={navigation} />
    </View>
  );
};

export default ReturnStocksScreen;

const styles = StyleSheet.create({});
