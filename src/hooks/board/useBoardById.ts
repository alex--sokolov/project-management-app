import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { BoardsService } from '@/services/api/BoardsService';
import { TIME_AUTO_CLOSE, TIME_LOGOUT_DELAY } from '@/configs/toasts';
import { boardError } from '@/services/toasts/toasts';
import { sleep } from '@/utils/sleep';

export const useBoardById = (id: string | undefined) => {
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ['boards', 'detail', id],
    queryFn: () => BoardsService.getBoardById(id as string),
    onError: async ({ statusCode, message }: { statusCode: number; message: string }) => {
      boardError(statusCode, message);
      await sleep(TIME_AUTO_CLOSE + TIME_LOGOUT_DELAY);
      navigate('/boards');
    },
    enabled: !!id,
    retry: 0,
  });
  return { data };
};
