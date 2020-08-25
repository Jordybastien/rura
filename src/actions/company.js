import {
  FETCH_COMPANY_CATEGORIES,
  FETCH_COMPANY_OFFENCES,
  FETCH_COMPANIES,
  RECORD_COMPANY,
} from './actionTypes';
import { saveCompanyData } from '../services/company';
import { logError } from './error';
import {
  newFetchCompanyCategories,
  newFetchCompanyOffences,
} from '../services/company';
import { hideLoading, showLoading } from './loading';

export const getCompanies = (companies) => {
  return {
    type: FETCH_COMPANIES,
    companies,
  };
};

export const recordCompany = (company) => {
  return {
    type: RECORD_COMPANY,
    company,
  };
};

export const getCompanyCategories = (companyCategories) => {
  return {
    type: FETCH_COMPANY_CATEGORIES,
    companyCategories,
  };
};

export const getCompanyOffences = (companyOffences) => {
  return {
    type: FETCH_COMPANY_OFFENCES,
    companyOffences,
  };
};

export const handleSaveCompany = (data) => {
  return async (dispatch) => {
    try {
      await saveCompanyData(data);
      return dispatch(recordCompany(data));
    } catch (error) {
      return dispatch(
        logError('Failed to record data, please contact Administration')
      );
    }
  };
};

export const fetchCompanyCategories = (user) => {
  return async (dispatch) => {
    dispatch(showLoading());
    return newFetchCompanyCategories({ company_id: user })
      .then((companyCategories) => {
        dispatch(getCompanyCategories(companyCategories));
        dispatch(hideLoading());
      })
      .catch(() => dispatch(hideLoading()));
  };
};

export const fetchCategoryOffences = (category) => {
  return async (dispatch) => {
    dispatch(showLoading());
    return newFetchCompanyOffences({ category_id: category })
      .then((companyOffences) => {
        dispatch(getCompanyOffences(companyOffences));
        dispatch(hideLoading());
      })
      .catch(() => dispatch(hideLoading()));
  };
};
