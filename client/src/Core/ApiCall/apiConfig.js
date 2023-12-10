import axios from "axios";
import { BASE_URL } from "./EndPoint";

export const setAccessToken = async (payload) => {
  instance.defaults.headers.common["Authorization"] = "Bearer " + payload;
  // instance.defaults.headers.common['Authorization'] = 'Bearer ' + payload;
};

const instance = axios.create({
  baseURL: BASE_URL,
});

instance.defaults.headers.post["Content-Type"] = "application/json";
// instance.defaults.headers.post['Content-Type'] = 'multipart/form-data';

instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
