import {StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Homescreen from '../pages/Homescreen';
import Loginscreen from '../pages/Loginscreen';
import {getUser} from '../app.storage';
import OrderStocks from '../pages/OrderStocks';
import OrderPreviewScreen from '../pages/OrderPreviewScreen';
import BookingScreen from '../pages/BookingScreen';
import BookingsuccessScreen from '../pages/BookingsuccessScreen';
import BookingfailureScreen from '../pages/BookingfailureScreen';
import IndentsListScreen from '../pages/IndentsListScreen';
import ReturnStocksScreen from '../pages/ReturnStocksScreen';
import ReturnStocksPreviewScreen from '../pages/ReturnStocksPreviewScreen';
import ReturnBookingScreen from '../pages/ReturnBookingScreen';
import ViewIndentsScreen from '../pages/ViewIndentsScreen';
import ViewReturnsScreen from '../pages/ViewReturnsScreen';
import ViewSummaryScreen from '../pages/ViewSummaryScreen';
import SplashScreen from '../pages/SplashScreen';

const AppNavigation = ({state, dispatch}) => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={Homescreen} />
        <Stack.Screen name="OrderStocks" component={OrderStocks} />
        <Stack.Screen name="OrderPreview" component={OrderPreviewScreen} />
        <Stack.Screen name="Booking" component={BookingScreen} />
        <Stack.Screen name="BookingSuccess" component={BookingsuccessScreen} />
        <Stack.Screen name="BookingFailure" component={BookingfailureScreen} />
        <Stack.Screen name="IndentsList" component={IndentsListScreen} />
        <Stack.Screen name="ReturnStocks" component={ReturnStocksScreen} />
        <Stack.Screen
          name="ReturnStocksPreview"
          component={ReturnStocksPreviewScreen}
        />
        <Stack.Screen name="ReturnBooking" component={ReturnBookingScreen} />
        <Stack.Screen name="ViewIndents" component={ViewIndentsScreen} />
        <Stack.Screen name="ViewReturns" component={ViewReturnsScreen} />
        <Stack.Screen name="ViewSummary" component={ViewSummaryScreen} />

        <Stack.Screen name="Login" component={Loginscreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;

const styles = StyleSheet.create({});
