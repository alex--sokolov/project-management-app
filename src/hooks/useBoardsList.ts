import { useRef } from 'react';
import { Id, toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';

import { TIME_AUTO_CLOSE } from '@/configs/toasts';
import { BoardsService } from '@/services/api/BoardsService';

export const useBoardsList = (userId: string | undefined) => {
  const toastId = useRef<Id | undefined>(undefined);

  const { isLoading, data, isError, error, refetch } = useQuery({
    queryKey: ['userBoards', userId],
    queryFn: () => {
      toastId.current = toast.loading('Loading boards...');
      return BoardsService.getBoardsByUserId(userId as string);
    },
    onSuccess: async () => {
      if (toastId.current) {
        toast.update(toastId.current, {
          render: 'Boards are loaded',
          autoClose: TIME_AUTO_CLOSE,
          type: 'success',
          isLoading: false,
        });
        // toast.dismiss(toastId.current);
      }
    },
    onError: () => {
      if (toastId.current) {
        toast.update(toastId.current, {
          render: 'Something went wrong...',
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
