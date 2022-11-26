import { useMutation } from '@tanstack/react-query';
import { IUserLogin } from '@/data/models';
import { AuthService } from '@/services/api/AuthService';
import { useRef } from 'react';
import { Id, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuthUser } from './useAuthUser';

export const useUserSignIn = (onErrorCallBack?: () => void) => {
  const toastId = useRef<Id | undefined>(undefined);
  const navigate = useNavigate();
  const authUser = useAuthUser();
  const { isLoading, data, isError, error, mutate } = useMutation({
    mutationFn: (user: IUserLogin) => {
      toastId.current = toast.loading('Trying to login...');
      return AuthService.loginUser(user);
    },
    onSuccess: (data) => {
      AuthService.saveToken(data.token);
      authUser.refetch();
      navigate('/');
    },
    onError: () => {
      if (onErrorCallBack) {
        onErrorCallBack();
      }
      if (toastId.current) {
        toast.update(toastId.current, {
          render: 'Authorization error...',
          autoClose: 3000,
          type: 'error',
          isLoading: false,
        });
      }
    },
    retry: 0,
  });
  return { isLoading, data, isError, error, mutate };
};
