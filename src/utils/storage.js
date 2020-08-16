import { AsyncStorage } from 'react-native';

const TOKEN_KEY = 'DVCMS:TOKEN';

export const setToken = (token) => {
  AsyncStorage.setItem(TOKEN_KEY, token);
};

export const getToken = async () => {
  const token = await AsyncStorage.getItem(TOKEN_KEY);
  return token;
};

export const deleteToken = async () => {
  return await AsyncStorage.removeItem(TOKEN_KEY);
};
