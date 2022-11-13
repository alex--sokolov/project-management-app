import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IUser, IUserUpdate } from '@/data/models';
import { AuthService } from '@/services/api/AuthService';

export const useUserSignUp = () => {
  const queryClient = useQueryClient();
  const { isLoading, data, isError, error, mutateAsync } = useMutation({
    mutationFn: (user: Omit<IUserUpdate, '_id'>) => AuthService.registerUser(user),
    onSuccess: (newUser: IUser) => {
      console.log('newUser', newUser);
      // ✅ update all the lists that contain this user
      queryClient.setQueriesData(
        ['users', 'list', { filters: 'all' }],
        (previous: IUser[] | undefined) =>
          !!previous
            ? previous.map((user) => (user._id === newUser._id ? newUser : user))
            : previous
      );

      // 🥳 invalidate all the lists, but don't refetch the active one
      queryClient.invalidateQueries({
        queryKey: ['users', 'list'],
      });
    },
    retry: 0,
  });

  const now = new Date(Date.now()).toLocaleTimeString();
  const user = data
    ? {
        ...data,
        name: `${data.name} - created at ${now}`,
      }
    : null;

  return { isLoading, user, isError, error, mutateAsync };
};
