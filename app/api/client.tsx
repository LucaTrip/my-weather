import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://www.metaweather.com',
  timeout: 10000,
  timeoutErrorMessage: 'TimeoutError',
});

export default axiosInstance;
