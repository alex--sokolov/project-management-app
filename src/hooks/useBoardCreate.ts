import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Id, toast } from 'react-toastify';

import { Board } from '@/data/models';
import { ResponseError } from '@/types';
import { TIME_AUTO_CLOSE } from '@/configs/toasts';
import { BoardsService } from '@/services/api/BoardsService';

export const useBoardCreate = () => {
  const toastId = useRef<Id | undefined>(undefined);

  const queryClient = useQueryClient();
  const { data, mutateAsync } = useMutation({
    mutationFn: (newBoard: Omit<Board, '_id'>) => {
      toastId.current = toast.loading('Creating board...');
      return BoardsService.createNewBoard(newBoard);
    },
    onSuccess: (newBoard: Board) => {
      queryClient.setQueriesData(
        ['user', 'boards', newBoard.owner],
        (previous: Board[] | undefined) => {
          if (previous) {
            previous.push(newBoard);
            return previous;
          } else return [newBoard];
        }
      );
      queryClient.invalidateQueries({
        queryKey: ['user', 'boards', newBoard.owner],
      });
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
