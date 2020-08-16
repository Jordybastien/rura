import { combineReducers } from 'redux';
import loading from './loading';
import error from './error';
import companies from './company';
import companyCategories from './companyCategories';
import companyOffences from './companyOffences';

export default combineReducers({
  loading,
  error,
  companies,
  companyCategories,
  companyOffences,
});
