import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Id, toast } from 'react-toastify';

import { TIME_AUTO_CLOSE } from '@/configs/toasts';
import { Task } from '@/data/models';
import { sleep } from '@/utils/sleep';
import { useTranslation } from 'react-i18next';
import { TasksService } from '@/services/api/TasksService';

export const useChangeTasksOrder = () => {
  const { t } = useTranslation();
  const toastId = useRef<Id | undefined>(undefined);
  const queryClient = useQueryClient();
  const { data, mutate, mutateAsync } = useMutation({
    mutationFn: (tasks: Pick<Task, '_id' | 'columnId' | 'order'>[]) => {
      toastId.current = toast.loading(`${t('toasts.task-order-change-pending')}`);
      return TasksService.changeTasksOrderInListOfTasks(tasks);
    },
    onSuccess: async (tasks: Task[]) => {
      if (toastId.current) {
        toast.update(toastId.current, {
          render: `${t('toasts.task-order-change-success')}`,
          autoClose: TIME_AUTO_CLOSE,
          type: 'success',
          isLoading: false,
        });
      }
      await sleep(TIME_AUTO_CLOSE);
      await queryClient.invalidateQueries(['boards', tasks[0].boardId, 'tasks']);
    },
    onError: async () => {
      if (toastId.current) {
        toast.update(toastId.current, {
          render: `${t('toasts.tasks-order-change-error')}`,
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
