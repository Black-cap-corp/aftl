import {BackHandler, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {Text, Button} from '@ui-kitten/components';
import Lottie from 'lottie-react-native';
import assets from '../assets';

const BookingsuccessScreen = ({route, navigation}) => {
  const goToHome = () => {
    navigation.navigate('Home');
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', goToHome);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', goToHome);
    };
  }, []);
  const {title, content} = route.params;
  return (
    <View style={styles.page}>
      <Lottie
        style={styles.success_icon}
        source={assets.lottieFiles.sucess}
        autoPlay
        loop
      />
      <Text category="h2" style={{marginTop: 20}}>
        {title}
      </Text>
      <Text category="label" style={{marginTop: 20}}>
        {content}
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

export default BookingsuccessScreen;

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
