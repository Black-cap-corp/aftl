import {StyleSheet, Text, View, BackHandler} from 'react-native';
import React, {useEffect} from 'react';
import IndentsList from '../shared/ui/IndentsList';
import IndentsPage from '../shared/ui/IndentsPage';

const IndentsListScreen = ({route, navigation}) => {
  const handleBackPress = () => {
    navigation.goBack(null);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
  }, []);
  return (
    <View style={{flex: 1}}>
      <IndentsPage route={route} navigation={navigation} />
    </View>
  );
};

export default IndentsListScreen;

const styles = StyleSheet.create({});
