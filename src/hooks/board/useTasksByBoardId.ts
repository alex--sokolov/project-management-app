import { useQuery } from '@tanstack/react-query';

import { TasksService } from '@/services/api/TasksService';

export const useTasksByBoardId = (id: string | undefined) => {
  const { data, refetch } = useQuery({
    queryKey: ['boards', id, 'tasks'],
    queryFn: () => TasksService.getAllTasksByBoardId(id as string),
    enabled: !!id,
    retry: 0,
  });
  return { data, refetch };
};
