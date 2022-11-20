export enum Auth {
  Login,
  Register,
}
export interface ResponseError {
  message: string;
  statusCode: number;
}
