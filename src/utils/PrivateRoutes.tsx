import { Outlet, Navigate } from 'react-router-dom';
import { LocalStorageService } from '@/services/localStorage';

const PrivateRoutes = () => {
  return LocalStorageService.getToken() ? <Outlet /> : <Navigate to="auth/signin" />;
};

export default PrivateRoutes;
