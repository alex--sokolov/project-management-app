import { useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Id, toast } from 'react-toastify';
import { ResponseError } from '@/types';
import { TIME_AUTO_CLOSE } from '@/configs/toasts';
import { BoardsService } from '@/services/api/BoardsService';

export const useBoardDelete = () => {
  const toastId = useRef<Id | undefined>(undefined);

  const { data, mutateAsync } = useMutation({
    mutationFn: (boardId: string) => {
      toastId.current = toast.loading('Deleting board...');
      return BoardsService.deleteBoardById(boardId);
    },
    onSuccess: () => {
      if (toastId.current) {
        toast.dismiss(toastId.current);
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
  return { data, mutateAsync };
};
