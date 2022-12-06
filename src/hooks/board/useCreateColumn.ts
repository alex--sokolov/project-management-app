import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Id, toast } from 'react-toastify';

import { ColumnsService } from '@/services/api/ColumnsService';
import { TIME_AUTO_CLOSE } from '@/configs/toasts';
import { sleep } from '@/utils/sleep';
import { Column } from '@/data/models';

export const useCreateColumn = () => {
  const toastId = useRef<Id | undefined>(undefined);
  const queryClient = useQueryClient();
  const { data, mutate, mutateAsync } = useMutation({
    mutationFn: ({
      boardId,
      column,
    }: {
      boardId: string;
      column: Omit<Column, '_id' | 'boardId'>;
    }) => {
      toastId.current = toast.loading('Creating new column...');
      return ColumnsService.createNewColumn(boardId, column);
    },
    onSuccess: async (newColumn) => {
      if (toastId.current) {
        await toast.update(toastId.current, {
          render: 'Column was successfully created',
          autoClose: TIME_AUTO_CLOSE,
          type: 'success',
          isLoading: false,
        });
      }
      await sleep(TIME_AUTO_CLOSE);
      queryClient.setQueriesData(
        ['boards', newColumn.boardId, 'columns'],
        (previous: Column[] | undefined) => (!!previous ? [...previous, newColumn] : previous)
      );
    },
    onError: async () => {
      if (toastId.current) {
        toast.update(toastId.current, {
          render: 'Column was not created',
          autoClose: TIME_AUTO_CLOSE,
          type: 'error',
          isLoading: false,
        });
      }
      await sleep(TIME_AUTO_CLOSE);
    },
    retry: 0,
  });
  return { data, mutate, mutateAsync };
};
