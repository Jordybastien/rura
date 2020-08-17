import axios from 'axios';
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

export const saveCompanyData = async (companyDetails) => {

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const raw = JSON.stringify(companyDetails);

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  fetch(
    'http://46.101.182.152:9003/api/auth/AddInvoiceCompanyMobile',
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      return result;
    })
    .catch((error) => console.log('error', error));
};
