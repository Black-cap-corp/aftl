import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {getUser} from '../app.storage';
import {AuthContext} from '../shared/context/logincontext';

const SplashScreen = ({navigation}) => {
  const contextValues = React.useContext(AuthContext);

  React.useEffect(() => {
    const user = getUser();
    user.then(value => {
      console.log(value, 'here');
      if (value) {
        navigation.navigate('Home');
        contextValues.dispatch({type: 'SIGN_IN', user: JSON.parse(value)});
      } else {
        navigation.navigate('Login');
        contextValues.dispatch({type: 'SIGN_OUT'});
      }
    });
  }, []);
  return (
    <View
      style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Please Wait</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
