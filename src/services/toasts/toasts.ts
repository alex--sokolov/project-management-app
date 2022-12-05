import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { sleep } from '@/utils/sleep';

import { TIME_AUTO_CLOSE, TIME_DATA_FETCHING } from '@/configs/toasts';

export const taskSucceed = () => {
  toast.success('Task is successfully created', { position: toast.POSITION.BOTTOM_CENTER });
};

export const userDeleted = () => {
  toast.success('User is successfully deleted', {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: TIME_AUTO_CLOSE,
  });
};

export const userLoggedOut = () => {
  toast.success('You have logged out successfully', {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: TIME_AUTO_CLOSE,
  });
};

export const userEdited = () => {
  toast.success(`User's data is successfully edited`, { position: toast.POSITION.BOTTOM_CENTER });
};

export const taskNotCompleted = () => {
  toast.error('Error notification', {
    position: toast.POSITION.BOTTOM_CENTER,
    autoClose: TIME_AUTO_CLOSE,
  });
};

export const boardError = (statusCode: number, message: string) => {
  toast.error(`${message}(${statusCode})`, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: TIME_AUTO_CLOSE,
  });
};

export const dataFetching = () => {
  return toast.promise(sleep(TIME_DATA_FETCHING), {
    pending: 'Promise is pending',
    success: 'Promise resolved 👌',
    error: 'Promise rejected 🤯',
  });
};
