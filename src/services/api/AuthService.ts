import { request } from '@/utils/axios-utils';

import { UserLogin, UserUpdate } from '@/data/models';

export const AuthService = {
  async registerUser(user: Omit<UserUpdate, '_id'>) {
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

  async loginUser(user: UserLogin) {
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
