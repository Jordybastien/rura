import api from './api';

export const fetchDocuments = async () => {
  const res = await api.get('/ShowConfiscatedDocs');
  return res.data;
};
