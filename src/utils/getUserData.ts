import { LocalStorageService } from '@/services/localStorage';
import { AuthUserToken } from '@/types';
import jwt_decode from 'jwt-decode';

export const getAuthUserData = () => {
  const token = LocalStorageService.getToken();
  if (token) {
    const userData: AuthUserToken = jwt_decode(token as string);
    if (userData.exp * 1000 > new Date().getTime()) {
      return userData;
    }
    LocalStorageService.logOutUser();
    return null;
  }
  return null;
};
