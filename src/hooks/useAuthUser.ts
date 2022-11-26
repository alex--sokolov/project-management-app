import { useQuery } from '@tanstack/react-query';
import jwt_decode from 'jwt-decode';

import { LocalStorageService } from '@/services/localStorage';

import { AuthUserToken } from '@/types';

export const useAuthUser = () => {
  const { data, refetch } = useQuery({
    queryKey: ['authUser'],
    queryFn: () => {
      const token = LocalStorageService.getToken();
      try {
        const userData: AuthUserToken = jwt_decode(token as string);
        if (userData.exp * 1000 > new Date().getTime()) {
          return userData;
        }
      } catch (error) {}

      return null;
    },
    retry: 0,
  });

  return { data, refetch };
};
