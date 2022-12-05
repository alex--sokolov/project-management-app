import { useQuery } from '@tanstack/react-query';

import { ColumnsService } from '@/services/api/ColumnsService';

export const useColumnsByBoardId = (id: string | undefined) => {
  const { data, refetch } = useQuery({
    queryKey: ['boards', id, 'columns'],
    queryFn: () => ColumnsService.getAllColumns(id as string),
    enabled: !!id,
    retry: 0,
  });
  return { data, refetch };
};
