import { FETCH_MY_INVOICES } from '../actions/actionTypes';

export default function myInvoices(state = {}, action) {
  switch (action.type) {
    case FETCH_MY_INVOICES:
      return {
        ...state,
        ...action.invoices,
      };
    default:
      return state;
  }
}
