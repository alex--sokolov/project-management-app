import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UsersService } from '@/services/api/UsersService';
import { User, UserUpdate } from '@/data/models';

export const useUserUpdate = () => {
  const queryClient = useQueryClient();
  const { isLoading, data, isError, error, mutateAsync } = useMutation({
    mutationFn: (user: UserUpdate) => UsersService.updateUser(user),
    onSuccess: async (newUser) => {
      // ✅ update the user
      queryClient.setQueryData(['users', 'detail', newUser._id], newUser);

      // ✅ update all the lists that contain this user
      queryClient.setQueriesData(
        ['users', 'list', { filters: 'all' }],
        (previous: User[] | undefined) =>
          !!previous
            ? previous.map((user) => (user._id === newUser._id ? newUser : user))
            : previous
      );

      // 🥳 invalidate all the lists, but don't refetch the active one
      await queryClient.invalidateQueries({
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
        name: `${data.name} - updated at ${now}`,
      }
    : null;

  return { isLoading, user, isError, error, mutateAsync };
};
