import { IUserLogin, IUserUpdate } from '@/data/models';
import { request } from '@/utils/axios-utils';
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;

export const AuthService = {
  async registerUser(user: Omit<IUserUpdate, '_id'>) {
    return await request(
      {
        url: `auth/signup`,
        method: 'post',
        data: {
          name: user.name,
          login: user.login,
          password: user.password,
        },
      },
      false
    );
  },

  async loginUser(user: IUserLogin) {
    return await request(
      {
        url: `auth/signin`,
        method: 'post',
        data: {
          login: user.login,
          password: user.password,
        },
      },
      false
    );
  },
};
