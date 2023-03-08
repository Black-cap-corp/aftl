import {StyleSheet, BackHandler, View} from 'react-native';
import React, {useEffect} from 'react';
import ViewIndents from '../ui/view/ViewIndents';

const ViewIndentsScreen = ({route, navigation}) => {
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
    <View style={{flex: 1, padding: 10}}>
      <ViewIndents route={route} navigation={navigation} />
    </View>
  );
};

export default ViewIndentsScreen;

const styles = StyleSheet.create({});
