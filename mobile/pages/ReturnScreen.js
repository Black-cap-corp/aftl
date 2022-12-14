import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ReturnForm from '../ui/return/ReturnForm';

const ReturnScreen = ({route, navigation}) => {
  return (
    <View style={styles.orderScreen}>
      <ReturnForm route={route} navigation={navigation} />
    </View>
  );
};

export default ReturnScreen;

const styles = StyleSheet.create({
  orderScreen: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    flex: 1,
    backgroundColor: '#ebecf0',
  },
});
