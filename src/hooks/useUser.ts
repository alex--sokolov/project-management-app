import { useQuery } from '@tanstack/react-query';
import { UsersService } from '@/services/api/UsersService';

export const useUser = (id: string | undefined) => {
  const { isLoading, data, isError, error, refetch } = useQuery({
    queryKey: ['users', 'detail', id],
    queryFn: () => UsersService.getUserById(id as string),
    enabled: !!id,
    retry: 0,
  });
  return { isLoading, data, isError, error, refetch };
};
