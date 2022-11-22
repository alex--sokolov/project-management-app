import { AuthService } from '@/services/api/AuthService';
import { useQuery } from '@tanstack/react-query';

export const useAuthUser = () => {
  const { data, refetch } = useQuery({
    queryKey: ['authUser'],
    queryFn: () => {
      const token = AuthService.getToken();

      let tokenDate: number;
      if (token) {
        tokenDate = Number(AuthService.getTokenDate());
        if (new Date().getTime() - tokenDate < 39600000) {
          return true;
        }
      }
      return false;
    },
    retry: 0,
  });
  return { data, refetch };
};
