import { Outlet, Navigate, useOutletContext } from 'react-router-dom';
import { LocalStorageService } from '@/services/localStorage';
import { Spinner } from '@/components/shared/Spinner';

import { AuthUserState } from '@/types';

export const PrivateRoutes = () => {
  const { authUser, isLoading } = useOutletContext<AuthUserState>();
  return LocalStorageService.getToken() ? (
    authUser ? (
      <Outlet context={authUser} />
    ) : (
      <Spinner isLoading={isLoading} />
    )
  ) : (
    <Navigate to="/" />
  );
};
