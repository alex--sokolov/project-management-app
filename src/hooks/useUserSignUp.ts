import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IUser, IUserUpdate } from '@/data/models';
import { AuthService } from '@/services/api/AuthService';
import { useRef } from 'react';
import { Id, toast } from 'react-toastify';
import { ResponseError } from '@/types';

export const useUserSignUp = () => {
  const toastId = useRef<Id | undefined>(undefined);

  const queryClient = useQueryClient();
  const { isLoading, data, isError, error, mutateAsync } = useMutation({
    mutationFn: (user: Omit<IUserUpdate, '_id'>) => {
      toastId.current = toast.loading('Trying to register...');
      return AuthService.registerUser(user);
    },
    onSuccess: (newUser: IUser) => {
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
      if (toastId.current) {
        toast.update(toastId.current, {
          render: 'Registration success!',
          autoClose: 3000,
          type: 'success',
          isLoading: false,
        });
      }
    },
    onError: (error: ResponseError) => {
      if (toastId.current) {
        toast.update(toastId.current, {
          render: error.message,
          autoClose: 3000,
          type: 'error',
          isLoading: false,
        });
      }
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
