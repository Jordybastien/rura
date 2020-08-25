import { FETCH_DRIVER_OFFENCES } from '../actions/actionTypes';

export default function driverOffences(state = {}, action) {
  switch (action.type) {
    case FETCH_DRIVER_OFFENCES:
      return {
        ...state,
        ...action.driverOffences,
      };
    default:
      return state;
  }
}
