import {StyleSheet, BackHandler, View} from 'react-native';
import React, {useEffect} from 'react';
import ReturnStocksPreview from '../ui/return/ReturnStocksPreview';

const ReturnStocksPreviewScreen = ({route, navigation}) => {
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
      <ReturnStocksPreview route={route} navigation={navigation} />
    </View>
  );
};

export default ReturnStocksPreviewScreen;

const styles = StyleSheet.create({});
