import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ViewForm from '../ui/view/ViewForm';

const ViewScreen = ({route, navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: '#ebecf0', padding: 10}}>
      <ViewForm route={route} navigation={navigation} />
    </View>
  );
};

export default ViewScreen;

const styles = StyleSheet.create({});
