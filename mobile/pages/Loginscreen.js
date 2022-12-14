import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Layout} from '@ui-kitten/components';
import Lottie from 'lottie-react-native';
import assets from '../assets';
import LoginForm from '../ui/login/LoginForm';
import {AuthContext} from '../shared/context/logincontext';

const Loginscreen = () => {
  return (
    <Layout style={styles.container}>
      <Layout style={{flex: 0.5}}></Layout>
      <Layout style={styles.layout_block}>
        <Lottie
          style={styles.login_icon}
          source={assets.lottieFiles.login}
          autoPlay
          loop
        />
      </Layout>

      <Layout style={styles.layout_block}>
        <LoginForm />
      </Layout>
      <Layout style={{flex: 0.5}}></Layout>
    </Layout>
  );
};

export default Loginscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingVertical: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  layout_block: {
    width: '100%',
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  login_icon: {
    alignContent: 'center',
    justifyContent: 'center',
  },
});
