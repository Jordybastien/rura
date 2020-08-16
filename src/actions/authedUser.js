import { SET_AUTHED_USER, LOGOUT_USER } from './actionTypes';
import { loginUser, checkUser } from '../services/auth';
import { logError } from './error';
import { setToken } from '../utils/storage';

export const setAuthedUser = (user) => {
  return {
    type: SET_AUTHED_USER,
    user,
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
  };
};

export const handleUserLogin = (user) => {
  return async (dispatch) => {
    try {
      const token = await loginUser(user);
      const loggedIn = await checkUser({ token });
      setToken(token);
      dispatch(setAuthedUser(loggedIn));
      return true;
    } catch (error) {
      return dispatch(logError('Email or Password mismatch'));
    }
  };
};
