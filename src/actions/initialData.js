import { getCompanies, getCompaniesWithDetails } from './company';
import { fetchCompanies, newFetchCompanyDetails } from '../services/company';
import { hideLoading, showLoading } from './loading';
import { getDocuments } from './documents';
import { fetchDocuments } from '../services/documents';
import { getDriverOffences, getMyInvoices } from './driver';
import { fetchDriverOffences, fetchMyInvoices } from '../services/driver';
import { recordLocalData, fetchOfflineData } from '../services/storage';

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

  await recordLocalData(
    companies,
    companiesWithDetails,
    driverOffences,
    documents
  );

  return {
    companies,
    companiesWithDetails,
    driverOffences,
    documents,
  };
};
const getOfflineData = async () => {
  const {
    companies,
    companiesWithDetails,
    driverOffences,
    documents,
  } = await Promise.all(fetchOfflineData());

  return {
    companies,
    companiesWithDetails,
    driverOffences,
    documents,
  };
};

const getDriverData = async (userId) => {
  const [myInvoices] = await Promise.all([fetchMyInvoices(userId)]);

  return {
    myInvoices,
  };
};

export const handleInitialData = (connectionStatus) => {
  return async (dispatch) => {
    dispatch(showLoading());
    return connectionStatus
      ? getInitialData()
      : getOfflineData()
          .then(
            ({
              companies,
              companiesWithDetails,
              driverOffences,
              documents,
            }) => {
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
export const handleDriverData = (userId) => {
  return async (dispatch) => {
    dispatch(showLoading());
    return getDriverData(userId)
      .then(({ myInvoices }) => {
        dispatch(getMyInvoices(myInvoices));
        dispatch(hideLoading());
      })
      .catch(() => dispatch(hideLoading()));
  };
};
