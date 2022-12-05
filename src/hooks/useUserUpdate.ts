import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UsersService } from '@/services/api/UsersService';
import { UserUpdate } from '@/data/models';
import { Id, toast } from 'react-toastify';
import { useRef } from 'react';
import { TIME_AUTO_CLOSE } from '@/configs/toasts';

export const useUserUpdate = () => {
  const queryClient = useQueryClient();
  const toastId = useRef<Id | undefined>(undefined);
  const { data, mutateAsync } = useMutation({
    mutationFn: (user: UserUpdate) => {
      toastId.current = toast.loading('Mutating user info...');
      return UsersService.updateUser(user);
    },
    onSuccess: async (newUser) => {
      // ✅ update the user
      queryClient.setQueryData(['authUser'], newUser);
      if (toastId.current) {
        await toast.update(toastId.current, {
          render: 'User is updated successfully',
          autoClose: TIME_AUTO_CLOSE,
          type: 'success',
          isLoading: false,
        });
      }
      //
      // // ✅ update all the lists that contain this user
      // queryClient.setQueriesData(
      //   ['users', 'list', { filters: 'all' }],
      //   (previous: User[] | undefined) =>
      //     !!previous
      //       ? previous.map((user) => (user._id === newUser._id ? newUser : user))
      //       : previous
      // );
      //
      // // 🥳 invalidate all the lists, but don't refetch the active one
      // await queryClient.invalidateQueries({
      //   queryKey: ['users', 'list'],
      //   refetchType: 'none',
      // });
    },
    onError: () => {
      if (toastId.current) {
        toast.update(toastId.current, {
          render: 'User was not updated',
          autoClose: TIME_AUTO_CLOSE,
          type: 'error',
          isLoading: false,
        });
      }
    },
    retry: 0,
  });

  return { data, mutateAsync };
};
