import { useMutation, useQuery } from '@tanstack/react-query';
import { IUserLogin } from '@/data/models';
import { AuthService } from '@/services/api/AuthService';
import { useState } from 'react';
import { useUser } from './useUser';
import { AuthUser } from '@/types';
import jwt_decode from 'jwt-decode';
import { UsersService } from '@/services/api/UsersService';

export const useUserSignIn = () => {
  let id: string | undefined = undefined;
  const { isLoading, data, isError, isSuccess, error, mutateAsync } = useMutation({
    mutationFn: (user: IUserLogin) => AuthService.loginUser(user),
    onSuccess: (data) => {
      AuthService.saveToken(data.token);
    },
    retry: 0,
    // select: () => {
    //   userId = 'aaa';
    // },
  });
  if (data) {
    const userData: AuthUser = jwt_decode(data.token as string);
    id = userData.id;
  }
  const { data: userData } = useQuery({
    queryKey: ['users', 'detail', id],
    queryFn: () => {
      return UsersService.getUserById(id as string);
    },
    onSuccess: (data) => {
      console.log('nihera ne vivoditsa(((');
      console.log(data);
    },
    onError: (error) => {
      console.log('ppp');
    },
    enabled: !!id,
    retry: 0,
  });

  // AuthService.saveUserName(currentUser.name)
  return { isLoading, data, userData, isError, error, mutateAsync };
};
