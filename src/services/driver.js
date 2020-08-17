import api from './api';

export const findDriver = async (driver) => {
  const res = await api.post('/VerifyDriver', driver);
  return res.data.Driver_data;
};

export const recordDriverTicket = async (driverDetails) => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const raw = JSON.stringify(driverDetails);

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  fetch(
    'http://46.101.182.152:9003/api/auth/AddInvoiceDriverMobile',
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      return result;
    })
    .catch((error) => console.log('error', error));
};
