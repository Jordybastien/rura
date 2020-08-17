import { FETCH_DOCUMENTS } from './actionTypes';
import { logError } from './error';

export const getDocuments = (documents) => {
  return {
    type: FETCH_DOCUMENTS,
    documents,
  };
};
