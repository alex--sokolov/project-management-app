import { LS_TOKEN_KEY } from '@/configs/localStorage';

export const LocalStorageService = {
  saveToken(token: string) {
    localStorage.setItem(LS_TOKEN_KEY, token);
  },

  getToken() {
    return localStorage.getItem(LS_TOKEN_KEY);
  },

  logOutUser() {
    localStorage.removeItem(LS_TOKEN_KEY);
  },
};
