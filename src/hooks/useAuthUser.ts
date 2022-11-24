import { AuthService } from '@/services/api/AuthService';
import { AuthUser } from '@/types';
import { useQuery } from '@tanstack/react-query';
import jwt_decode from 'jwt-decode';

export const useAuthUser = () => {
  const { data, refetch } = useQuery({
    queryKey: ['authUser'],
    queryFn: () => {
      const token = AuthService.getToken();
      try {
        const userData: AuthUser = jwt_decode(token as string);
        if (userData.exp * 1000 > new Date().getTime()) {
          userData.name = AuthService.getSavedUserName() ?? '';
          return userData;
        }
      } catch (error) {}

      return null;
    },
    retry: 0,
  });

  return { data, refetch };
};
