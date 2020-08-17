import { combineReducers } from 'redux';
import loading from './loading';
import error from './error';
import companies from './company';
import companyCategories from './companyCategories';
import companyOffences from './companyOffences';
import authedUser from './authedUser';
import driver from './driver';

export default combineReducers({
  loading,
  error,
  companies,
  companyCategories,
  companyOffences,
  authedUser,
  driver,
});
