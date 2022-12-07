import { useQuery } from '@tanstack/react-query';
import jwt_decode from 'jwt-decode';

import { LocalStorageService } from '@/services/localStorage';

import { AuthUserToken } from '@/types';
import { UsersService } from '@/services/api/UsersService';

const getAuthUserId = () => {
  const token = LocalStorageService.getToken();
  if (token) {
    const userData: AuthUserToken = jwt_decode(token as string);
    if (userData.exp * 1000 > new Date().getTime()) {
      return userData.id;
    }
    LocalStorageService.logOutUser();
    return null;
  }
  return null;
};

export const useAuthUser = () => {
  const id = getAuthUserId();

  const { data } = useQuery({
    queryKey: ['authUser'],
    queryFn: () => UsersService.getUserById(id as string),
    enabled: !!id,
    retry: 0,
  });

  return { data };
};
