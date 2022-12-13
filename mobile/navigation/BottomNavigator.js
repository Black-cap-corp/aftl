import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components';
import OrderScreen from '../pages/OrderScreen';
import ReturnScreen from '../pages/ReturnScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ViewScreen from '../pages/ViewScreen';

const {Navigator, Screen} = createBottomTabNavigator();
const CartIcon = props => <Icon {...props} name="shopping-cart-outline" />;
const SeeIcon = props => <Icon {...props} name="eye-outline" />;
const BottomBar = ({navigation, state}) => {
  return (
    <BottomNavigation
      style={styles.bottomNavigation}
      selectedIndex={state.index}
      appearance="noIndicator"
      onSelect={index => navigation.navigate(state.routeNames[index])}>
      <BottomNavigationTab title="Orders" icon={CartIcon} />
      <BottomNavigationTab title="Return" icon={CartIcon} />
      <BottomNavigationTab title="View" icon={SeeIcon} />
    </BottomNavigation>
  );
};

const BottomNavigator = () => {
  return (
    <Navigator
      screenOptions={{headerShown: false}}
      tabBar={props => <BottomBar {...props} />}>
      <Screen name="Orders" component={OrderScreen} />
      <Screen name="Return" component={ReturnScreen} />
      <Screen name="View" component={ViewScreen} />
    </Navigator>
  );
};

export default BottomNavigator;

const styles = StyleSheet.create({
  bottomNavigation: {
    backgroundColor: '#FFFFFF',
  },
});
