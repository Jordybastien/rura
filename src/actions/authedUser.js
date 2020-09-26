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
      
      if (
        loggedIn.roles[0].display_name.toLowerCase() === 'user' ||
        loggedIn.roles[0].display_name.toLowerCase() === 'inspector'
      ) {
        setToken(token);
        dispatch(setAuthedUser(loggedIn));
        return true;
      } else {
        return dispatch(
          logError('Only Inspectors and Drivers are allowed to login ')
        );
      }
    } catch (error) {
      return dispatch(logError('Email or Password mismatch'));
    }
  };
};
