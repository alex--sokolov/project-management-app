import { Outlet, Navigate, useOutletContext, useLocation } from 'react-router-dom';
import { LocalStorageService } from '@/services/localStorage';
import { Spinner } from '@/components/shared/Spinner';

import { AuthUserState } from '@/types';

export const PrivateRegisterRoutes = () => {
  const location = useLocation();
  const { authUser, isLoading } = useOutletContext<AuthUserState>();

  return location.pathname === '/auth/signout' ? (
    <Outlet />
  ) : LocalStorageService.getToken() ? (
    authUser ? (
      <Navigate to="/" />
    ) : (
      <Spinner isLoading={isLoading} />
    )
  ) : (
    <Outlet />
  );
};
