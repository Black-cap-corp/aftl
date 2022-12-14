import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {Text, Button} from '@ui-kitten/components';
import Lottie from 'lottie-react-native';
import assets from '../assets';
import {BackHandler} from 'react-native';

const BookingfailureScreen = ({route, navigation}) => {
  const goToHome = () => {
    navigation.navigate('Home');
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', goToHome);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', goToHome);
    };
  }, []);
  return (
    <View style={styles.page}>
      <Lottie
        style={styles.success_icon}
        source={assets.lottieFiles.failure}
        autoPlay
        loop
      />
      <Text category="h2" style={{marginTop: 20}}>
        Failure
      </Text>
      <Text category="label" style={{marginTop: 20}}>
        Error performing the operation
      </Text>
      <Button
        style={styles.button}
        onPress={goToHome}
        appearance="outline"
        status="primary">
        Go To Home
      </Button>
    </View>
  );
};

export default BookingfailureScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    padding: 20,
  },
  button: {
    marginTop: 30,
  },
  success_icon: {
    height: 200,
  },
});
