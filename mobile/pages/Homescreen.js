import {BackHandler, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import BottomNavigator from '../navigation/BottomNavigator';
import Header from '../shared/ui/Header';
import {AuthContext} from '../shared/context/logincontext';

const Homescreen = ({navigation}) => {
  const handleBackPress = () => {
    BackHandler.exitApp();
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
  }, []);

  const contextValues = React.useContext(AuthContext);

  const onLogoutHandler = () => {
    contextValues.signOut(contextValues.dispatch);
    navigation.navigate('Login');
  };

  return (
    <View style={styles.home}>
      <Header navigation={navigation} onLogoutHandler={onLogoutHandler} />
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
