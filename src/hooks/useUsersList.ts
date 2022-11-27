import { useQuery } from '@tanstack/react-query';

import { UsersService } from '@/services/api/UsersService';

export const useUsersList = () => {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ['users', 'list', { filters: 'all' }],
    queryFn: UsersService.getAllUsers,

    // onSuccess: (data) => {
    //   console.log('data', data);
    // },
    // onError: (error: AxiosError) => {
    //   console.log('error', error);
    //   console.log('error.message', error.message);
    // },
    // select: (data): IUser[] => {
    //   console.log('select: ', data);
    //   return data.map((user: IUser) => ({
    //     ...user,
    //     name: user.name + 'add',
    //     // we can transform output data here
    //   }));
    // },
  });
  return { isLoading, data, isError, error };
};
