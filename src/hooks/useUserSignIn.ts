import { useMutation } from '@tanstack/react-query';
import { IUserLogin } from '@/data/models';
import { AuthService } from '@/services/api/AuthService';

export const useUserSignIn = () => {
  const { isLoading, data, isError, error, mutateAsync } = useMutation({
    mutationFn: (user: IUserLogin) => AuthService.loginUser(user),
    onSuccess: (data) => {
      console.log(data);
      AuthService.saveToken(data.token);
    },
    retry: 0,
  });

  return { isLoading, data, isError, error, mutateAsync };
};
