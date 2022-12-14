import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ViewIndents from '../ui/view/ViewIndents';

const ViewIndentsScreen = ({route, navigation}) => {
  return (
    <View style={{flex: 1, padding: 10}}>
      <ViewIndents route={route} navigation={navigation} />
    </View>
  );
};

export default ViewIndentsScreen;

const styles = StyleSheet.create({});
