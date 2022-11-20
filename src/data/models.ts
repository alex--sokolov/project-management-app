import { EMenu } from '@/components/Header/Header';

export interface IUser {
  _id: string;
  name: string;
  login: string;
}

export interface IUserLogin {
  login: string;
  password: string;
}

export interface IUserUpdate extends IUser {
  password: string;
}

export type PropsType = {
  open: () => void;
  direction?: string;
};

export type ClassNameType = {
  direction: string;
};
