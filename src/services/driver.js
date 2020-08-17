import api from './api';

export const findDriver = async (driver) => {
  const res = await api.post('/VerifyDriver', driver);
  return res.data.Driver_data;
};
