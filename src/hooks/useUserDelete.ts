import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UsersService } from '../services/api/UsersService';
import { IUser } from '../data/models';

export const useUserDelete = () => {
  const queryClient = useQueryClient();
  const { isLoading, data, mutateAsync } = useMutation({
    mutationFn: (userId: string) => UsersService.deleteUserById(userId),
    onSuccess: (newUser) => {
      // ✅ update the user
      queryClient.setQueryData(['users', 'detail', newUser._id], null);

      // ✅ update all the lists that contain this user
      queryClient.setQueriesData(
        ['users', 'list', { filters: 'all' }],
        (previous: IUser[] | undefined) =>
          !!previous ? previous.filter((user) => user._id !== newUser._id) : previous
      );

      // 🥳 invalidate all the lists, but don't refetch the active one
      queryClient.invalidateQueries({
        queryKey: ['users', 'list'],
        refetchType: 'none',
      });
    },
    retry: 0,
  });
  const now = new Date(Date.now()).toLocaleTimeString();
  const user = data
    ? {
        ...data,
        name: `${data.name} - deleted at ${now}`,
      }
    : null;

  return { isLoading, user, mutateAsync };
};
