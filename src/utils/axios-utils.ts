import axios, { AxiosError, AxiosResponse } from 'axios';

// When the authorization will be implemented,
// we need to get token from localStorage or cookies
// For now I use constant value

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzAzMjdkM2MyYmNiMjljNWIyY2FkMyIsImxvZ2luIjoiSU1hc2siLCJpYXQiOjE2NjgyOTczNDUsImV4cCI6MTY2ODM0MDU0NX0.iUx-ZfeSA8Me6twLYKapzDGpyRR1N9zVK0ugzk9vL1w';

const client = axios.create({ baseURL: process.env.REACT_APP_BACKEND_URL });

export const request = ({ ...options }) => {
  client.defaults.headers.common.Authorization = `Bearer ${token}`;
  const onSuccess = (response: AxiosResponse) => response.data;
  const onError = (error: AxiosError) => {
    // console.log('error: ', error);

    // catch errors and show them in toasts
    // if 401 - redirect to home page?
    // other logic...
    return Promise.reject(error);
  };

  return client(options).then(onSuccess).catch(onError);
};
