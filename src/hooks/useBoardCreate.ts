import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Id, toast } from 'react-toastify';

import { Board } from '@/data/models';
import { TIME_AUTO_CLOSE } from '@/configs/toasts';
import { BoardsService } from '@/services/api/BoardsService';
import { useTranslation } from 'react-i18next';
import { sleep } from '@/utils/sleep';

export const useBoardCreate = () => {
  const { t } = useTranslation();
  const toastId = useRef<Id | undefined>(undefined);
  const queryClient = useQueryClient();
  const { data, mutateAsync } = useMutation({
    mutationFn: (newBoard: Omit<Board, '_id'>) => {
      toastId.current = toast.loading(`${t('toasts.board-create-pending')}`);
      return BoardsService.createNewBoard(newBoard);
    },
    onSuccess: async (newBoard: Board) => {
      if (toastId.current) {
        await toast.update(toastId.current, {
          render: `${t('toasts.board-create-success')}`,
          autoClose: TIME_AUTO_CLOSE,
          type: 'success',
          isLoading: false,
        });
      }
      await sleep(TIME_AUTO_CLOSE);
      queryClient.setQueriesData(
        ['user', 'boards', newBoard.owner],
        (previous: Board[] | undefined) => {
          if (previous) {
            previous.push(newBoard);
            return previous;
          } else return [newBoard];
        }
      );
    },
    onError: () => {
      if (toastId.current) {
        toast.update(toastId.current, {
          render: `${t('toasts.board-create-error')}`,
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
