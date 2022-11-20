import { LS_TOKEN_KEY } from '@/configs/localStorage';
import axios, { AxiosError, AxiosResponse } from 'axios';

// When the authorization will be implemented,
// we need to get token from localStorage or cookies
// For now I'm using constant value

const token = localStorage.getItem(LS_TOKEN_KEY) ?? '';

const client = axios.create({ baseURL: process.env.REACT_APP_BACKEND_URL });

export const request = ({ ...options }, isToken = true) => {
  if (isToken) {
    client.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
  const onSuccess = (response: AxiosResponse) => response.data;
  const onError = (error: AxiosError) => {
    // console.log('error: ', error);

    // catch errors and show them in toasts
    // if 401 - redirect to home page?
    // other logic...
    return Promise.reject(error?.response?.data);
  };

  return client(options).then(onSuccess).catch(onError);
};
