import {StyleSheet} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Homescreen from '../pages/Homescreen';
import Loginscreen from '../pages/Loginscreen';
import {getUser} from '../app.storage';
import OrderStocks from '../pages/OrderStocks';

const AppNavigation = ({state, dispatch}) => {
  React.useEffect(() => {
    const user = getUser();
    user.then(value => {
      if (value) {
        console.log(value, 'login');
        dispatch({type: 'SIGN_IN', user: JSON.parse(value)});
      }
    });
  }, []);

  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Login">
        {state.isSignedIn ? (
          <>
            <Stack.Screen name="Home" component={Homescreen} />
            <Stack.Screen name="OrderStocks" component={OrderStocks} />
          </>
        ) : (
          <Stack.Screen name="Login" component={Loginscreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;

const styles = StyleSheet.create({});
