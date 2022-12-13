import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import IndentsList from '../shared/ui/IndentsList';
import IndentsPage from '../shared/ui/IndentsPage';

const IndentsListScreen = ({route, navigation}) => {
  return (
    <View style={{flex: 1}}>
      <IndentsPage route={route} navigation={navigation} />
    </View>
  );
};

export default IndentsListScreen;

const styles = StyleSheet.create({});
