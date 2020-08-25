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
import { getDocuments } from './documents';
import { fetchDocuments } from '../services/documents';
import { getDriverOffences } from './driver';

const getInitialData = async () => {
  const [
    companies,
    companyCategories,
    driverOffences,
    documents,
  ] = await Promise.all([
    fetchCompanies(),
    fetchCompanyCategories(),
    fetchCompanyOffences(),
    fetchDocuments(),
  ]);

  return {
    companies,
    companyCategories,
    driverOffences,
    documents,
  };
};

export const handleInitialData = () => {
  return async (dispatch) => {
    dispatch(showLoading());
    return getInitialData()
      .then(({ companies, companyCategories, driverOffences, documents }) => {
        dispatch(getCompanies(companies));
        // dispatch(getCompanyCategories(companyCategories));
        dispatch(getDriverOffences(driverOffences));
        dispatch(getDocuments(documents));
        dispatch(hideLoading());
      })
      .catch(() => dispatch(hideLoading()));
  };
};
