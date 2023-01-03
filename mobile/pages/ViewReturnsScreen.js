import {StyleSheet, BackHandler, View} from 'react-native';
import React, {useEffect} from 'react';
import ViewReturns from '../ui/view/ViewReturns';

const ViewReturnsScreen = ({route, navigation}) => {
  const handleBackPress = () => {
    navigation.goBack();
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
  }, []);
  return (
    <View style={{flex: 1, padding: 10}}>
      <ViewReturns route={route} navigation={navigation} />
    </View>
  );
};

export default ViewReturnsScreen;

const styles = StyleSheet.create({});
