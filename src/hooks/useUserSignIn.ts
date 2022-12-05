import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Id, toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';

import { AuthService } from '@/services/api/AuthService';
import { LocalStorageService } from '@/services/localStorage';

import { UserLogin } from '@/data/models';

import { TIME_AUTO_CLOSE } from '@/configs/toasts';

export const useUserSignIn = (onErrorCallBack?: () => void) => {
  const toastId = useRef<Id | undefined>(undefined);
  const navigate = useNavigate();
  const { isLoading, data, isError, error, mutate } = useMutation({
    mutationFn: (user: UserLogin) => {
      toastId.current = toast.loading('Trying to login...');
      return AuthService.loginUser(user);
    },
    onSuccess: async (data) => {
      LocalStorageService.saveToken(data.token);
      if (toastId.current) {
        toast.update(toastId.current, {
          render: 'Login successfully',
          autoClose: TIME_AUTO_CLOSE,
          type: 'success',
          isLoading: false,
        });
      }
      setTimeout(() => {
        navigate('/');
      }, TIME_AUTO_CLOSE);
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
  return { isLoading, data, isError, error, mutate };
};
