import { FETCH_COMPANY_CATEGORIES } from '../actions/actionTypes';

export default function companyCategories(state = {}, action) {
  switch (action.type) {
    case FETCH_COMPANY_CATEGORIES:
      return {
        ...state,
        ...action.companyCategories,
      };
    default:
      return state;
  }
}
