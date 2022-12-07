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
      return UsersService.getUserById(id as string);
    },
    enabled: !!id,
    retry: 3,
    staleTime: 1,
  });

  return { data, refetch };
};
