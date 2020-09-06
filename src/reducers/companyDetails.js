import { FETCH_COMPANIES_WITH_DETAILS } from '../actions/actionTypes';

export default function companiesDetails(state = {}, action) {
  switch (action.type) {
    case FETCH_COMPANIES_WITH_DETAILS:
      return {
        ...state,
        ...action.companies,
      };
    default:
      return state;
  }
}
