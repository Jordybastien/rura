import axios from 'axios';

export const baseURL = 'http://10.10.30.106/api/auth/';

const apiCall = axios.create({
  baseURL,
});

export default {
  get: apiCall.get,
  post: apiCall.post,
  put: apiCall.put,
  patch: apiCall.patch,
  delete: apiCall.delete,
};
