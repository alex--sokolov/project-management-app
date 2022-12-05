import { useQuery } from '@tanstack/react-query';
import jwt_decode from 'jwt-decode';

import { LocalStorageService } from '@/services/localStorage';

import { AuthUserToken, ResponseError } from '@/types';
import { UsersService } from '@/services/api/UsersService';
import { Id, toast } from 'react-toastify';
import { TIME_AUTO_CLOSE } from '@/configs/toasts';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

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
  console.log('id', id);
  const toastId = useRef<Id | undefined>(undefined);
  const navigate = useNavigate();

  const { data, refetch } = useQuery({
    queryKey: ['authUser'],
    queryFn: () => UsersService.getUserById(id as string),
    onError: (error: ResponseError) => {
      if (toastId.current) {
        toast.update(toastId.current, {
          render: error.message,
          autoClose: TIME_AUTO_CLOSE,
          type: 'error',
          isLoading: false,
        });
        navigate('/auth/signin');
      }
    },
    enabled: !!id,
    retry: 0,
    staleTime: 10000,
  });

  return { data, refetch };
};
