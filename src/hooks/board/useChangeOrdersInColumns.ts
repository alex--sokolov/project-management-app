import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Id, toast } from 'react-toastify';

import { ColumnsService } from '@/services/api/ColumnsService';
import { TIME_AUTO_CLOSE } from '@/configs/toasts';
import { Column } from '@/data/models';
import { sleep } from '@/utils/sleep';

export const useChangeColumnsOrder = () => {
  const toastId = useRef<Id | undefined>(undefined);
  const queryClient = useQueryClient();
  const { data, mutate, mutateAsync } = useMutation({
    mutationFn: (columns: Omit<Column, 'title' | 'boardId'>[]) => {
      return ColumnsService.changeColumnsOrderInListOfColumns(columns);
    },
    onSuccess: (columns: Column[]) => {
      queryClient.setQueriesData(
        ['boards', columns[0].boardId, 'columns'],
        (previous: Column[] | undefined) => {
          if (!!previous) {
            columns.sort((a, b) => a.order - b.order);
            return columns;
          }
          return previous;
        }
      );
    },
    onError: async () => {
      if (toastId.current) {
        toast.update(toastId.current, {
          render: 'Column order change failed',
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
