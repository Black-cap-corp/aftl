import {StyleSheet} from 'react-native';
import React from 'react';
import {Icon, Layout, Text} from '@ui-kitten/components';
import {getUser} from '../../app.storage';
const LoginIcon = props => (
  <Icon name="power-outline" fill="#000" style={styles.icon} {...props} />
);
const Header = () => {
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    getUser().then(value => {
      setUser(JSON.parse(value));
    });
  }, []);
  console.log(user);
  return (
    <Layout style={styles.header}>
      <Layout style={{flex: 8, justifyContent: 'center', alignItems: 'center'}}>
        <Text category="h6">Asian Fab Tec</Text>
        <Text category="p2">{user?.name}</Text>
      </Layout>
      <Layout style={styles.lay}>
        <LoginIcon />
      </Layout>
    </Layout>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 30,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  lay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
});
