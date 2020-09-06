import { getCompanies, getCompaniesWithDetails } from './company';
import { fetchCompanies, newFetchCompanyDetails } from '../services/company';
import { hideLoading, showLoading } from './loading';
import { getDocuments } from './documents';
import { fetchDocuments } from '../services/documents';
import { getDriverOffences } from './driver';
import { fetchDriverOffences } from '../services/driver';

const getInitialData = async () => {
  const [
    companies,
    companiesWithDetails,
    driverOffences,
    documents,
  ] = await Promise.all([
    fetchCompanies(),
    newFetchCompanyDetails(),
    fetchDriverOffences(),
    fetchDocuments(),
  ]);

  return {
    companies,
    companiesWithDetails,
    driverOffences,
    documents,
  };
};

export const handleInitialData = () => {
  return async (dispatch) => {
    dispatch(showLoading());
    return getInitialData()
      .then(
        ({ companies, companiesWithDetails, driverOffences, documents }) => {
          dispatch(getCompanies(companies));
          dispatch(getCompaniesWithDetails(companiesWithDetails));
          dispatch(getDriverOffences(driverOffences));
          dispatch(getDocuments(documents));
          dispatch(hideLoading());
        }
      )
      .catch(() => dispatch(hideLoading()));
  };
};
