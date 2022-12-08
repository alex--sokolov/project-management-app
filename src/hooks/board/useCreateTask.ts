import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Id, toast } from 'react-toastify';

import { TasksService } from '@/services/api/TasksService';
import { TIME_AUTO_CLOSE } from '@/configs/toasts';
import { sleep } from '@/utils/sleep';
import { Task } from '@/data/models';
import { useTranslation } from 'react-i18next';

export const useCreateTask = () => {
  const { t } = useTranslation();
  const toastId = useRef<Id | undefined>(undefined);
  const queryClient = useQueryClient();
  const { data, mutate, mutateAsync } = useMutation({
    mutationFn: ({
      boardId,
      columnId,
      task,
    }: {
      boardId: string;
      columnId: string;
      task: Omit<Task, '_id' | 'boardId' | 'columnId'>;
    }) => {
      toastId.current = toast.loading(`${t('toasts.task-create-pending')}`);
      return TasksService.createNewTask(boardId, columnId, task);
    },
    onSuccess: async (newTask) => {
      if (toastId.current) {
        await toast.update(toastId.current, {
          render: `${t('toasts.task-create-success')}`,
          autoClose: TIME_AUTO_CLOSE,
          type: 'success',
          isLoading: false,
        });
      }
      await sleep(TIME_AUTO_CLOSE);
      queryClient.setQueriesData(
        ['boards', newTask.boardId, 'tasks'],
        (previous: Task[] | undefined) => (!!previous ? [...previous, newTask] : previous)
      );
    },
    onError: async () => {
      if (toastId.current) {
        toast.update(toastId.current, {
          render: `${t('toasts.task-create-error')}`,
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
