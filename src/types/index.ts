export enum Auth {
  Login,
  Register,
  Logout,
}
export interface ResponseError {
  message: string;
  statusCode: number;
}

export interface AuthUser {
  exp: number;
  iat: number;
  id: string;
  login: string;
  name?: string;
}
