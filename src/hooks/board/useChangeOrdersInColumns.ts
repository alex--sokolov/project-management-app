import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Id, toast } from 'react-toastify';

import { ColumnsService } from '@/services/api/ColumnsService';
import { TIME_AUTO_CLOSE } from '@/configs/toasts';
import { Column } from '@/data/models';
import { sleep } from '@/utils/sleep';
import { useTranslation } from 'react-i18next';

export const useChangeColumnsOrder = () => {
  const { t } = useTranslation();
  const toastId = useRef<Id | undefined>(undefined);
  const queryClient = useQueryClient();
  const { data, mutate, mutateAsync } = useMutation({
    mutationFn: (columns: Omit<Column, 'title' | 'boardId'>[]) => {
      toastId.current = toast.loading(`${t('toasts.column-order-change-pending')}`);
      return ColumnsService.changeColumnsOrderInListOfColumns(columns);
    },
    onSuccess: async (columns: Column[]) => {
      if (toastId.current) {
        toast.update(toastId.current, {
          render: `${t('toasts.column-order-change-success')}`,
          autoClose: TIME_AUTO_CLOSE,
          type: 'success',
          isLoading: false,
        });
      }
      await sleep(TIME_AUTO_CLOSE);
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
          render: `${t('toasts.column-order-change-error')}`,
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
