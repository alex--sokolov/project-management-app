import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Id, toast } from 'react-toastify';

import { AuthService } from '@/services/api/AuthService';

import { User, UserUpdate } from '@/data/models';
import { ResponseError } from '@/types';
import { TIME_AUTO_CLOSE } from '@/configs/toasts';

export const useUserSignUp = () => {
  const toastId = useRef<Id | undefined>(undefined);

  const queryClient = useQueryClient();
  const { data, mutateAsync } = useMutation({
    mutationFn: (user: Omit<UserUpdate, '_id'>) => {
      toastId.current = toast.loading('Trying to register...');
      return AuthService.registerUser(user);
    },
    onSuccess: (newUser: User) => {
      // ✅ update all the lists that contain this user
      queryClient.setQueriesData(
        ['users', 'list', { filters: 'all' }],
        (previous: User[] | undefined) =>
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
          autoClose: TIME_AUTO_CLOSE,
          type: 'success',
          isLoading: false,
        });
      }
    },
    onError: (error: ResponseError) => {
      if (toastId.current) {
        toast.update(toastId.current, {
          render: error.message,
          autoClose: TIME_AUTO_CLOSE,
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

  return { user, mutateAsync };
};
