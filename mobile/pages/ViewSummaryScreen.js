import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, uuseEffect} from 'react';
import ViewSummary from '../ui/view/ViewSummary';
import {BackHandler} from 'react-native';

const ViewSummaryScreen = ({route, navigation}) => {
  const handleBackButtonClick = () => {
    navigation.navigate('Home');
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);

    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  return (
    <View style={{flex: 1, padding: 10}}>
      <ViewSummary route={route} navigation={navigation} />
    </View>
  );
};

export default ViewSummaryScreen;

const styles = StyleSheet.create({});
