export enum Auth {
  Login,
  Register,
  Logout,
}
export interface ResponseError {
  message: string;
  statusCode: number;
}
