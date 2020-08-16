import { FETCH_COMPANIES } from '../actions/actionTypes';

export default function companies(state = {}, action) {
  switch (action.type) {
    case FETCH_COMPANIES:
      return {
        ...state,
        ...action.companies,
      };
    default:
      return state;
  }
}
