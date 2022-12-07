import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Id, toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { AuthService } from '@/services/api/AuthService';
import { LocalStorageService } from '@/services/localStorage';

import { UserLogin } from '@/data/models';

import { TIME_AUTO_CLOSE, TIME_LOGOUT_DELAY } from '@/configs/toasts';
import { getAuthUserData } from '@/utils/getUserData';
import { sleep } from '@/utils/sleep';
import { useAuthUser } from '@/hooks/useAuthUser';

export const useUserSignIn = (onErrorCallBack?: () => void) => {
  const toastId = useRef<Id | undefined>(undefined);
  const authUser = useAuthUser();
  const navigate = useNavigate();

  let currentUser: UserLogin | null = null;
  const { isLoading, data, isError, error, mutate, mutateAsync } = useMutation({
    mutationFn: (user: UserLogin) => {
      currentUser = user;
      toastId.current = toast.loading('Trying to login...');
      return AuthService.loginUser(user);
    },
    onSuccess: async (data) => {
      console.log('data.token', data.token);
      LocalStorageService.saveToken(data.token);
      if (toastId.current) {
        toast.update(toastId.current, {
          render: 'Login successfully',
          autoClose: TIME_AUTO_CLOSE,
          type: 'success',
          isLoading: false,
        });
      }
      await authUser.refetch();
      navigate('/');
    },
    onError: () => {
      if (onErrorCallBack) {
        onErrorCallBack();
      }
      if (toastId.current) {
        toast.update(toastId.current, {
          render: 'Authorization error...',
          autoClose: TIME_AUTO_CLOSE,
          type: 'error',
          isLoading: false,
        });
      }
    },
    retry: 0,
  });
  return { isLoading, data, isError, error, mutate, mutateAsync };
};
