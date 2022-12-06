import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Id, toast } from 'react-toastify';

import { UsersService } from '@/services/api/UsersService';
import { LocalStorageService } from '@/services/localStorage';
import { TIME_AUTO_CLOSE } from '@/configs/toasts';
import { sleep } from '@/utils/sleep';

export const useUserDelete = () => {
  const toastId = useRef<Id | undefined>(undefined);
  const queryClient = useQueryClient();
  const { data, mutate, mutateAsync } = useMutation({
    mutationFn: (userId: string) => {
      toastId.current = toast.loading('Deleting the user...');
      return UsersService.deleteUserById(userId);
    },
    onSuccess: async () => {
      LocalStorageService.logOutUser();
      if (toastId.current) {
        await toast.update(toastId.current, {
          render: 'User deleted successfully',
          autoClose: TIME_AUTO_CLOSE,
          type: 'success',
          isLoading: false,
        });
      }
      await sleep(TIME_AUTO_CLOSE);
      queryClient.setQueryData(['authUser'], null);
    },
    retry: 0,
  });
  return { data, mutate, mutateAsync };
};
