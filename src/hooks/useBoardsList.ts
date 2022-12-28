import { useRef } from 'react';
import { Id, toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';

import { TIME_AUTO_CLOSE } from '@/configs/toasts';
import { BoardsService } from '@/services/api/BoardsService';
import { useTranslation } from 'react-i18next';

export const useBoardsList = (userId: string | undefined) => {
  const toastId = useRef<Id | undefined>(undefined);
  const { t } = useTranslation();
  const { isLoading, data, isError, error, refetch } = useQuery({
    queryKey: ['userBoards', userId],
    queryFn: () => {
      toastId.current = toast.loading(`${t('toasts.board-fetch-pending')}`);
      return BoardsService.getBoardsByUserId(userId as string);
    },
    onSuccess: async () => {
      if (toastId.current) {
        toast.update(toastId.current, {
          render: `${t('toasts.board-fetch-success')}`,
          autoClose: TIME_AUTO_CLOSE,
          type: 'success',
          isLoading: false,
        });
      }
    },
    onError: () => {
      if (toastId.current) {
        toast.update(toastId.current, {
          render: `${t('toasts.board-fetch-error')}`,
          autoClose: TIME_AUTO_CLOSE,
          type: 'error',
          isLoading: false,
        });
      }
    },
    enabled: !!userId,
  });
  return { isLoading, data, isError, error, refetch };
};
