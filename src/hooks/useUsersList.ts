import { useQuery } from '@tanstack/react-query';

import { UsersService } from '@/services/api/UsersService';

export const useUsersList = () => {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ['users', 'list', { filters: 'all' }],
    queryFn: UsersService.getAllUsers,
  });
  return { isLoading, data, isError, error };
};
