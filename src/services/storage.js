import { AsyncStorage } from 'react-native';

const COMPANIES_KEY = 'RURA_DVCMS:COMPANIES_KEY';
const COMPANIES_WITH_DETAILS_KEY = 'RURADVCMS:COMPANIES_WITH_DETAILS_KEY';
const DRIVER_OFFENCES_KEY = 'RURADVCMS:DRIVER_OFFENCES_KEY';
const DOCUMENTS_KEY = 'RURADVCMS:DOCUMENTS_KEY';
const DATA_DRIVER_OFFLINE_OFFENCES_KEY =
  'RURADVCMS:DATA_DRIVER_OFFLINE_OFFENCES_KEY';
const DATA_COMPANY_OFFLINE_OFFENCES_KEY =
  'RURADVCMS:DATA_COMPANY_OFFLINE_OFFENCES_KEY';

export const recordLocalData = async (
  companies,
  companiesWithDetails,
  driverOffences,
  documents
) => {
  await AsyncStorage.setItem(COMPANIES_KEY, JSON.stringify(companies));
  await AsyncStorage.setItem(
    COMPANIES_WITH_DETAILS_KEY,
    JSON.stringify(companiesWithDetails)
  );
  await AsyncStorage.setItem(
    DRIVER_OFFENCES_KEY,
    JSON.stringify(driverOffences)
  );
  await AsyncStorage.setItem(DOCUMENTS_KEY, JSON.stringify(documents));
};

export const fetchOfflineData = async () => {
  const companies = await AsyncStorage.getItem(COMPANIES_KEY);
  const companiesWithDetails = await AsyncStorage.getItem(
    COMPANIES_WITH_DETAILS_KEY
  );
  const driverOffences = await AsyncStorage.getItem(DRIVER_OFFENCES_KEY);
  const documents = await AsyncStorage.getItem(DOCUMENTS_KEY);

  return {
    companies,
    companiesWithDetails,
    driverOffences,
    documents,
  };
};

export const recordOfflineDriverOffence = (driverDetails) => {};

export const recordOfflineCompanyOffence = (companyDetails) => {};

export const fetchOfflineOffences = async () => {
  const companiesOffences = await AsyncStorage.getItem(
    DATA_COMPANY_OFFLINE_OFFENCES_KEY
  );
  const driversOffences = await AsyncStorage.getItem(
    DATA_DRIVER_OFFLINE_OFFENCES_KEY
  );

  return [JSON.parse(companiesOffences), JSON.parse(driversOffences)];
};

export const deleteOfflineCompanyOffences = () =>
  AsyncStorage.removeItem(DATA_COMPANY_OFFLINE_OFFENCES_KEY).then(() => {
    return true;
  });

export const deleteOfflineDriverOffences = () =>
  AsyncStorage.removeItem(DATA_DRIVER_OFFLINE_OFFENCES_KEY).then(() => {
    return true;
  });
