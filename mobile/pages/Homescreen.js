import {BackHandler, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import BottomNavigator from '../navigation/BottomNavigator';
import Header from '../shared/ui/Header';

const Homescreen = () => {
  const handleBackPress = () => {
    BackHandler.exitApp();
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
  }, []);

  return (
    <View style={styles.home}>
      <Header />
      <BottomNavigator />
    </View>
  );
};

export default Homescreen;

const styles = StyleSheet.create({
  home: {
    flex: 1,
    backgroundColor: '#ebecf0',
  },
  header: {
    minHeight: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
});
