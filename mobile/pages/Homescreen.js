import {StyleSheet} from 'react-native';
import React from 'react';
import BottomNavigator from '../navigation/BottomNavigator';
import Header from '../shared/ui/Header';

const Homescreen = () => {
  return (
    <>
      <Header />
      <BottomNavigator />
    </>
  );
};

export default Homescreen;

const styles = StyleSheet.create({
  header: {
    minHeight: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
});
