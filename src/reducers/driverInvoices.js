import { FETCH_DRIVER_INVOICES } from '../actions/actionTypes';

export default function driverInvoices(state = {}, action) {
  switch (action.type) {
    case FETCH_DRIVER_INVOICES:
      return {
        ...state,
        ...action.driverInvoices,
      };
    default:
      return state;
  }
}
