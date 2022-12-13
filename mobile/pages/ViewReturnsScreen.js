import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ViewReturns from '../ui/view/ViewReturns';

const ViewReturnsScreen = ({route, navigation}) => {
  return (
    <View style={{flex: 1, padding: 10}}>
      <ViewReturns route={route} navigation={navigation} />
    </View>
  );
};

export default ViewReturnsScreen;

const styles = StyleSheet.create({});
