import { SEARCH_DRIVER, RECORD_DRIVER } from './actionTypes';
import { findDriver, recordDriverTicket } from '../services/driver';
import { logError } from './error';

export const getDriver = (driver) => {
  return {
    type: SEARCH_DRIVER,
    driver,
  };
};

export const recordDriver = (driver) => {
  return {
    type: RECORD_DRIVER,
    driver,
  };
};

export const handleSearchDriver = (data) => {
  return async (dispatch) => {
    try {
      const driver = await findDriver(data);
      if (driver) {
        return dispatch(getDriver(driver[0]));
      } else {
        return dispatch(logError('Driver record not found'));
      }
    } catch (error) {
      return dispatch(logError('Driver record not found'));
    }
  };
};

export const handleSaveDriverTicket = (data) => {
  return async (dispatch) => {
    try {
      await recordDriverTicket(data);
      return dispatch(recordDriver(data));
    } catch (error) {
      return dispatch(
        logError('Failed to record data, please contact Administration')
      );
    }
  };
};
