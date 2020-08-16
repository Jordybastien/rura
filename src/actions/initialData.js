import {
  getCompanies,
  getCompanyCategories,
  getCompanyOffences,
} from './company';
import {
  fetchCompanies,
  fetchCompanyCategories,
  fetchCompanyOffences,
} from '../services/company';
import { hideLoading, showLoading } from './loading';

const getInitialData = async () => {
  const [companies, companyCategories, companyOffences] = await Promise.all([
    fetchCompanies(),
    fetchCompanyCategories(),
    fetchCompanyOffences(),
  ]);

  return {
    companies,
    companyCategories,
    companyOffences,
  };
};

export const handleInitialData = () => {
  return async (dispatch) => {
    dispatch(showLoading());
    return getInitialData()
      .then(({ companies, companyCategories, companyOffences }) => {
        dispatch(getCompanies(companies));
        dispatch(getCompanyCategories(companyCategories));
        dispatch(getCompanyOffences(companyOffences));
        dispatch(hideLoading());
      })
      .catch(() => dispatch(hideLoading()));
  };
};
