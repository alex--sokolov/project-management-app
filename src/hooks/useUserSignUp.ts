import { useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Id, toast } from 'react-toastify';

import { AuthService } from '@/services/api/AuthService';

import { UserUpdate } from '@/data/models';
import { ResponseError } from '@/types';
import { TIME_AUTO_CLOSE } from '@/configs/toasts';
import { useNavigate } from 'react-router-dom';
import { sleep } from '@/utils/sleep';

export const useUserSignUp = () => {
  const toastId = useRef<Id | undefined>(undefined);
  const navigate = useNavigate();
  const { data, mutateAsync } = useMutation({
    mutationFn: (user: Omit<UserUpdate, '_id'>) => {
      toastId.current = toast.loading('Trying to register...');
      return AuthService.registerUser(user);
    },
    onSuccess: async () => {
      if (toastId.current) {
        toast.update(toastId.current, {
          render: 'Registration success!',
          autoClose: TIME_AUTO_CLOSE,
          type: 'success',
          isLoading: false,
        });
      }
      await sleep(TIME_AUTO_CLOSE);
      navigate('/');
    },
    onError: (error: ResponseError) => {
      if (toastId.current) {
        toast.update(toastId.current, {
          render: error.message,
          autoClose: TIME_AUTO_CLOSE,
          type: 'error',
          isLoading: false,
        });
      }
    },
    retry: 0,
  });

  return { data, mutateAsync };
};
