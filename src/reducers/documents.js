import { FETCH_DOCUMENTS } from '../actions/actionTypes';

export default function documents(state = {}, action) {
  switch (action.type) {
    case FETCH_DOCUMENTS:
      return {
        ...state,
        ...action.documents,
      };
    default:
      return state;
  }
}
