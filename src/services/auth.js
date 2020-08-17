import api from './api';
import { getToken } from '../utils/storage';
import jwtDecode from 'jwt-decode';

export const loginUser = async (user) => {
  const res = await api.post('/login', user);
  return res.data.access_token;
};

export const checkUser = async (token) => {
  try {
    const res = await api.post('/me', token);
    return res.data.user;
  } catch (error) {
    return {};
  }
};

export const checkToken = async () => {
  const token = await getToken();
  let user;

  if (token) {
    user = await checkUser({ token });
    return { token: jwtDecode(token), user };
  }
  return { token: null, user: null };
};
