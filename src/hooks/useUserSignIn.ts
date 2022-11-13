import { useMutation } from '@tanstack/react-query';
import { IUserLogin } from '@/data/models';
import { AuthService } from '@/services/api/AuthService';

export const useUserSignIn = () => {
  const { isLoading, data, isError, error, mutateAsync } = useMutation({
    mutationFn: (user: IUserLogin) => AuthService.loginUser(user),
    onSuccess: (token) => {
      console.log('token', token);
      // Save token to localStorage/cookies
    },
    retry: 0,
  });

  return { isLoading, data, isError, error, mutateAsync };
};
