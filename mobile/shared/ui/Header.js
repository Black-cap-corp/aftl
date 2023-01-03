import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Modal, Card, Button, Text} from '@ui-kitten/components';
import {getUser, removeUser} from '../../app.storage';
import AntDesign from 'react-native-vector-icons/AntDesign';

const LoginIcon = props => (
  <AntDesign name="poweroff" fill="#000" style={styles.icon} {...props} />
);
const Header = ({navigation, onLogoutHandler}) => {
  const [user, setUser] = React.useState(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    getUser().then(value => {
      setUser(JSON.parse(value));
    });
  }, []);
  const logoutHandler = () => {
    removeUser(null).then(val => {
      onLogoutHandler();
      setVisible(false);
    });
  };
  return (
    <View style={styles.header}>
      <View style={{flex: 8, justifyContent: 'center', alignItems: 'center'}}>
        <Text category="h5">Asian Fab Tec</Text>
        <Text category="s1">{user?.name}</Text>
      </View>
      <View style={styles.lay}>
        <LoginIcon
          style={{fontSize: 20, fontWeight: 'bold'}}
          onPress={() => setVisible(true)}
        />
      </View>
      <Modal visible={visible}>
        <Card disabled={true}>
          <Text>Are you sure you want to logout ?</Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 24,
            }}>
            <Button style={{marginRight: 12}} onPress={() => setVisible(false)}>
              Cancel
            </Button>
            <Button onPress={logoutHandler}>Logout</Button>
          </View>
        </Card>
      </Modal>
    </View>
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
