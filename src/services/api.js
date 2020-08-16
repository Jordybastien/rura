import axios from 'axios';

export const baseURL = 'http://46.101.182.152:9003/api/auth/';

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