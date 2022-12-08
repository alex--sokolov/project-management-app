import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Id, toast } from 'react-toastify';

import { UsersService } from '@/services/api/UsersService';
import { LocalStorageService } from '@/services/localStorage';
import { TIME_AUTO_CLOSE } from '@/configs/toasts';
import { sleep } from '@/utils/sleep';
import { useTranslation } from 'react-i18next';

export const useUserDelete = () => {
  const toastId = useRef<Id | undefined>(undefined);
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { data, mutate, mutateAsync } = useMutation({
    mutationFn: (userId: string) => {
      toastId.current = toast.loading(`${t('toasts.user-delete-pending')}`);
      return UsersService.deleteUserById(userId);
    },
    onSuccess: async () => {
      LocalStorageService.logOutUser();
      if (toastId.current) {
        await toast.update(toastId.current, {
          render: `${t('toasts.user-delete-success')}`,
          autoClose: TIME_AUTO_CLOSE,
          type: 'success',
          isLoading: false,
        });
      }
      await sleep(TIME_AUTO_CLOSE);
      queryClient.setQueryData(['authUser'], null);
    },
    onError: async () => {
      LocalStorageService.logOutUser();
      if (toastId.current) {
        await toast.update(toastId.current, {
          render: `${t('toasts.user-delete-error')}`,
          autoClose: TIME_AUTO_CLOSE,
          type: 'error',
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
