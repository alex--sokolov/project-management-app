import { useQuery } from '@tanstack/react-query';
import { UsersService } from '@/services/api/UsersService';
import { getAuthUserData } from '@/utils/getUserData';

export const useAuthUser = () => {
  const userData = getAuthUserData();
  const id = userData?.id || null;
  const { data, refetch } = useQuery({
    queryKey: ['authUser'],
    queryFn: () => {
      const userData = getAuthUserData();
      const id = userData?.id || null;
      return id ? UsersService.getUserById(id as string) : null;
    },
    enabled: !!id,
    staleTime: 1,
  });

  return { data, refetch };
};
