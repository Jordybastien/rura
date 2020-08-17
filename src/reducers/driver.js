import { SEARCH_DRIVER } from '../actions/actionTypes';

export default function driver(state = {}, action) {
  switch (action.type) {
    case SEARCH_DRIVER:
      return {
        ...state,
        ...action.driver,
      };
    default:
      return state;
  }
}
