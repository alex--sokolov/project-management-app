import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Id, toast } from 'react-toastify';

import { TasksService } from '@/services/api/TasksService';
import { TIME_AUTO_CLOSE } from '@/configs/toasts';
import { sleep } from '@/utils/sleep';
import { Task } from '@/data/models';

export const useCreateTask = () => {
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
      toastId.current = toast.loading('Creating new column...');
      return TasksService.createNewTask(boardId, columnId, task);
    },
    onSuccess: async (newTask) => {
      if (toastId.current) {
        await toast.update(toastId.current, {
          render: 'Task was successfully created',
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
          render: 'Task was not created',
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
