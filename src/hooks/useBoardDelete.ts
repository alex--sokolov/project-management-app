import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Id, toast } from 'react-toastify';
import { TIME_AUTO_CLOSE } from '@/configs/toasts';
import { BoardsService } from '@/services/api/BoardsService';
import { useTranslation } from 'react-i18next';
import { Board } from '@/data/models';
import { sleep } from '@/utils/sleep';

export const useBoardDelete = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const toastId = useRef<Id | undefined>(undefined);

  const { data, mutateAsync } = useMutation({
    mutationFn: (boardId: string) => {
      toastId.current = toast.loading(`${t('toasts.board-delete-pending')}`);
      return BoardsService.deleteBoardById(boardId);
    },
    onSuccess: async (deletedBoard: Board) => {
      if (toastId.current) {
        await toast.update(toastId.current, {
          render: `${t('toasts.board-delete-success')}`,
          autoClose: TIME_AUTO_CLOSE,
          type: 'success',
          isLoading: false,
        });
      }
      await sleep(TIME_AUTO_CLOSE);
      queryClient.setQueriesData(
        ['user', 'boards', deletedBoard.owner],
        (previous: Board[] | undefined) => {
          if (previous) {
            return previous.filter((board: Board) => board._id !== deletedBoard._id);
          }
        }
      );
    },
    onError: () => {
      if (toastId.current) {
        toast.update(toastId.current, {
          render: `${t('toasts.board-delete-error')}`,
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
