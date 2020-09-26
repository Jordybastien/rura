import {
  SEARCH_DRIVER,
  RECORD_DRIVER,
  FETCH_DRIVER_OFFENCES,
  FETCH_DRIVER_INVOICES,
  FETCH_MY_INVOICES,
} from './actionTypes';
import { findDriver, recordDriverTicket } from '../services/driver';
import { logError } from './error';

export const getDriver = (driver) => {
  return {
    type: SEARCH_DRIVER,
    driver,
  };
};

export const getMyInvoices = (invoices) => {
  return {
    type: FETCH_MY_INVOICES,
    invoices,
  };
};

export const recordDriver = (driver) => {
  return {
    type: RECORD_DRIVER,
    driver,
  };
};

export const getDriverInvoices = (driverInvoices) => {
  return {
    type: FETCH_DRIVER_INVOICES,
    driverInvoices,
  };
};

export const getDriverOffences = (driverOffences) => {
  return {
    type: FETCH_DRIVER_OFFENCES,
    driverOffences,
  };
};

export const handleSearchDriver = (data) => {
  return async (dispatch) => {
    try {
      const {
        Driver_data: driver,
        Invoices: driverInvoices,
      } = await findDriver(data);

      if (driver) {
        dispatch(getDriverInvoices(driverInvoices));
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
      const record = await recordDriverTicket(data);
      if (!record.response_status) {
        return dispatch(
          logError(
            'Driver can not be given a ticket! he has less than 10 points remaining'
          )
        );
      }
      return dispatch(recordDriver(data));
    } catch (error) {
      return dispatch(
        logError('Failed to record data, please contact Administration')
      );
    }
  };
};
