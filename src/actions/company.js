import {
  FETCH_COMPANY_CATEGORIES,
  FETCH_COMPANY_OFFENCES,
  FETCH_COMPANIES,
} from './actionTypes';

export const getCompanies = (companies) => {
  return {
    type: FETCH_COMPANIES,
    companies,
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
