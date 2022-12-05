import { TFunction } from 'i18next';

export enum Auth {
  Login,
  Register,
  Logout,
}
export interface ResponseError {
  message: string;
  statusCode: number;
}

export interface AuthUserToken {
  exp: number;
  iat: number;
  id: string;
  login: string;
  name: string;
}

export type PropsType = {
  direction?: string;
  name?: string;
};

export type ClassNameType = {
  direction: string;
};

export enum EMenu {
  row = 'header__list',
  column = 'header__burger-list',
}

export enum EModal {
  yes = 'yes',
  no = 'no',
}

export type LangType = {
  lang: (language: string) => void;
};

export type TType = {
  t: TFunction<'translation', undefined>;
};
