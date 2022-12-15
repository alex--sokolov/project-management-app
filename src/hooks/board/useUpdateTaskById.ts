import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Id, toast } from 'react-toastify';

import { TasksService } from '@/services/api/TasksService';
import { TIME_AUTO_CLOSE } from '@/configs/toasts';
import { sleep } from '@/utils/sleep';
import { Task } from '@/data/models';
import { useTranslation } from 'react-i18next';

export const useUpdateTaskById = () => {
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
      task: Omit<Task, 'boardId'>;
    }) => {
      toastId.current = toast.loading(`${t('toasts.task-update-pending')}`);
      return TasksService.updateTaskById(boardId, columnId, task);
    },
    onSuccess: async (updatedTask) => {
      if (toastId.current) {
        await toast.update(toastId.current, {
          render: `${t('toasts.task-update-success')}`,
          autoClose: TIME_AUTO_CLOSE,
          type: 'success',
          isLoading: false,
        });
      }
      await sleep(TIME_AUTO_CLOSE);
      queryClient.setQueriesData(
        ['boards', updatedTask.boardId, 'tasks'],
        (previous: Task[] | undefined) =>
          !!previous
            ? [...previous.filter((task) => task._id !== updatedTask._id), updatedTask]
            : previous
      );
    },
    onError: async () => {
      if (toastId.current) {
        toast.update(toastId.current, {
          render: `${t('toasts.task-update-error')}`,
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
