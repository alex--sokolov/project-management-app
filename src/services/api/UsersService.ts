import { IUserUpdate } from '../../data/models';
import { request } from '../../utils/axios-utils';

export const UsersService = {
  async fetchUsers() {
    return await request({ url: '/users' });
  },

  async getUserById(id: string) {
    return await request({ url: `/users/${id}` });
  },

  async updateUser(user: IUserUpdate) {
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
