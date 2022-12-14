import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ReturnStocksPreview from '../ui/return/ReturnStocksPreview';

const ReturnStocksPreviewScreen = ({route, navigation}) => {
  return (
    <View style={{flex: 1}}>
      <ReturnStocksPreview route={route} navigation={navigation} />
    </View>
  );
};

export default ReturnStocksPreviewScreen;

const styles = StyleSheet.create({});
