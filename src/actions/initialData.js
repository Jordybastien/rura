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

const getInitialData = async () => {
  const [
    companies,
    companyCategories,
    companyOffences,
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
    companyOffences,
    documents,
  };
};

export const handleInitialData = () => {
  return async (dispatch) => {
    dispatch(showLoading());
    return getInitialData()
      .then(({ companies, companyCategories, companyOffences, documents }) => {
        dispatch(getCompanies(companies));
        // dispatch(getCompanyCategories(companyCategories));
        // dispatch(getCompanyOffences(companyOffences));
        dispatch(getDocuments(documents));
        dispatch(hideLoading());
      })
      .catch(() => dispatch(hideLoading()));
  };
};
