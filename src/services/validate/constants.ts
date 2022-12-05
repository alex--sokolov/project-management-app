export const defaultRegisterFields = {
  name: '',
  login: '',
  password: '',
};

export const onlyWordsPattern = /^[a-zа-я\d]+$/i;
export const onlyWordsErrMsg = 'you must use only letters and digits';

export const emailPattern =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
export const emailErrMsg = 'invalid e-mail';
