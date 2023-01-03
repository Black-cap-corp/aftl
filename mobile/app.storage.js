import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUser = async () => {
  try {
    return await AsyncStorage.getItem('@user');
  } catch (e) {
    console.log('error', e);
  }
};

export const storeUser = async user => {
  try {
    const userValue = JSON.stringify(user);

    await AsyncStorage.setItem('@user', userValue);
  } catch (e) {
    console.log(e);
  }
};

export const removeUser = async () => {
  try {
    await AsyncStorage.removeItem('@user');
  } catch (e) {
    console.log(e);
  }
};
