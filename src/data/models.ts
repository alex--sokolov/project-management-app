export interface IUser {
  _id: string;
  name: string;
  login: string;
}

export interface IUserUpdate extends IUser {
  password: string;
}
