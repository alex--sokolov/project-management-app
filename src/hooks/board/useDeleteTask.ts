import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Id, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import { TIME_AUTO_CLOSE } from '@/configs/toasts';
import { sleep } from '@/utils/sleep';
import { TasksService } from '@/services/api/TasksService';

import { Column, Task } from '@/data/models';

export const useDeleteTask = () => {
  const { t } = useTranslation();
  const toastId = useRef<Id | undefined>(undefined);
  const queryClient = useQueryClient();
  const { data, mutate, mutateAsync } = useMutation({
    mutationFn: ({
      boardId,
      columnId,
      taskId,
    }: {
      boardId: string;
      columnId: string;
      taskId: string;
    }) => {
      toastId.current = toast.loading(`${t('toasts.task-delete-pending')}`);
      return TasksService.deleteTaskById(boardId, columnId, taskId);
    },
    onSuccess: async (deletedTask) => {
      if (toastId.current) {
        await toast.update(toastId.current, {
          render: `${t('toasts.task-delete-success')}`,
          autoClose: TIME_AUTO_CLOSE,
          type: 'success',
          isLoading: false,
        });
      }
      await sleep(TIME_AUTO_CLOSE);
      queryClient.setQueriesData(
        ['boards', deletedTask.boardId, 'tasks'],
        (previous: Column[] | undefined) =>
          !!previous
            ? previous.filter(
                (task: Pick<Task, '_id' | 'title' | 'order' | 'boardId'>) =>
                  task._id !== deletedTask._id
              )
            : previous
      );
    },
    onError: async () => {
      if (toastId.current) {
        toast.update(toastId.current, {
          render: `${t('toasts.task-delete-error')}`,
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
