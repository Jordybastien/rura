import api from './api';

export const fetchCompanies = async () => {
  const res = await api.get('/ShowCompanyNamesMobile');
  return res.data;
};

export const fetchCompanyCategories = async () => {
  const res = await api.get('/ShowCompanyCategoriesMobile');
  return res.data;
};

export const fetchCompanyOffences = async () => {
  const res = await api.get('/ShowCompanyOffenseMobile');
  return res.data;
};
