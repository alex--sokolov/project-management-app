import { request } from '@/utils/axios-utils';

import { UserUpdate } from '@/data/models';

export const UsersService = {
  async getAllUsers() {
    return await request({ url: '/users' });
  },

  async getUserById(id: string) {
    return await request({ url: `/users/${id}` });
  },

  async updateUser(user: UserUpdate) {
    return await request({
      url: `/users/${user._id}`,
      method: 'put',
      data: {
        name: user.name,
        login: user.login,
        password: user.password,
      },
    });
  },

  async deleteUserById(id: string) {
    return await request({ url: `/users/${id}`, method: 'delete' });
  },
};
