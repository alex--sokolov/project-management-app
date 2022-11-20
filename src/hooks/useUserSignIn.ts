import { useMutation } from '@tanstack/react-query';
import { IUserLogin } from '@/data/models';
import { AuthService } from '@/services/api/AuthService';
import { LS_DATE_KEY, LS_TOKEN_KEY } from '@/configs/localStorage';

export const useUserSignIn = () => {
  const { isLoading, data, isError, error, mutateAsync } = useMutation({
    mutationFn: (user: IUserLogin) => AuthService.loginUser(user),
    onSuccess: (data) => {
      console.log('token', data.token);
      localStorage.setItem(LS_DATE_KEY, `${new Date().getTime()}`);
      localStorage.setItem(LS_TOKEN_KEY, data.token);
    },
    retry: 0,
  });

  return { isLoading, data, isError, error, mutateAsync };
};
