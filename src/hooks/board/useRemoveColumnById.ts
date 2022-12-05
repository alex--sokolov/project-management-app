import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Id, toast } from 'react-toastify';

import { ColumnsService } from '@/services/api/ColumnsService';
import { TIME_AUTO_CLOSE } from '@/configs/toasts';
import { sleep } from '@/utils/sleep';
import { Column } from '@/data/models';

export const useUserDelete = () => {
  const toastId = useRef<Id | undefined>(undefined);
  const queryClient = useQueryClient();
  const { data, mutate, mutateAsync } = useMutation({
    mutationFn: ({ boardId, columnId }: { boardId: string; columnId: string }) => {
      toastId.current = toast.loading('Deleting the column...');
      return ColumnsService.deleteColumnById(boardId, columnId);
    },
    onSuccess: async (deletedColumn) => {
      console.log('Column deleted successfully');

      if (toastId.current) {
        await toast.update(toastId.current, {
          render: 'Column deleted successfully',
          autoClose: TIME_AUTO_CLOSE,
          type: 'success',
          isLoading: false,
        });
      }
      await sleep(TIME_AUTO_CLOSE);
      queryClient.setQueriesData(
        ['boards', deletedColumn.boardId, 'columns'],
        (previous: Column[] | undefined) =>
          !!previous
            ? previous.filter((column: Column) => column._id !== deletedColumn._id)
            : previous
      );
    },
    onError: () => {
      if (toastId.current) {
        toast.update(toastId.current, {
          render: 'Column was not deleted',
          autoClose: TIME_AUTO_CLOSE,
          type: 'error',
          isLoading: false,
        });
      }
    },
    retry: 0,
  });
  return { data, mutate, mutateAsync };
};
