import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UsersService } from '@/services/api/UsersService';
import { UserUpdate } from '@/data/models';
import { Id, toast } from 'react-toastify';
import { useRef } from 'react';
import { TIME_AUTO_CLOSE } from '@/configs/toasts';
import { useTranslation } from 'react-i18next';

export const useUserUpdate = () => {
  const queryClient = useQueryClient();
  const toastId = useRef<Id | undefined>(undefined);
  const { t } = useTranslation();
  const { data, mutateAsync } = useMutation({
    mutationFn: (user: UserUpdate) => {
      toastId.current = toast.loading(`${t('toasts.user-update-pending')}`);
      return UsersService.updateUser(user);
    },
    onSuccess: async (newUser) => {
      // ✅ update the user
      queryClient.setQueryData(['authUser'], newUser);
      if (toastId.current) {
        await toast.update(toastId.current, {
          render: `${t('toasts.user-update-success')}`,
          autoClose: TIME_AUTO_CLOSE,
          type: 'success',
          isLoading: false,
        });
      }
    },
    onError: () => {
      if (toastId.current) {
        toast.update(toastId.current, {
          render: `${t('toasts.user-update-error')}`,
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
