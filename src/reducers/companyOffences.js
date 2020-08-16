import { FETCH_COMPANY_OFFENCES } from '../actions/actionTypes';

export default function companyOffences(state = {}, action) {
  switch (action.type) {
    case FETCH_COMPANY_OFFENCES:
      return {
        ...state,
        ...action.companyOffences,
      };
    default:
      return state;
  }
}
