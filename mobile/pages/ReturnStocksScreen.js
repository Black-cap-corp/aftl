import {StyleSheet, Text, View, BackHandler} from 'react-native';
import React, {useEffect} from 'react';
import ReturnStocksEdit from '../ui/return/ReturnStocksEdit';

const ReturnStocksScreen = ({route, navigation}) => {
  const handleBackPress = () => {
    navigation.goBack();
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
  }, []);
  return (
    <View style={{flex: 1}}>
      <ReturnStocksEdit route={route} navigation={navigation} />
    </View>
  );
};

export default ReturnStocksScreen;

const styles = StyleSheet.create({});
