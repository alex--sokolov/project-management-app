import { AuthService } from '@/services/api/AuthService';
import { useQuery } from '@tanstack/react-query';

export const useAuthUser = () => {
  const { data } = useQuery({
    queryKey: ['authUser'],
    queryFn: () => {
      const token = AuthService.getToken();

      let tokenDate: number;
      if (token) {
        tokenDate = Number(AuthService.getTokenDate());
        console.log(new Date().getTime() - tokenDate);

        if (new Date().getTime() - tokenDate < 39600000) {
          return true;
        }
      }
      return false;
    },
    retry: 0,
  });
  return { data };
};
