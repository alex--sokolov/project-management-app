import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { sleep } from '@/utils/sleep';

import { TIME_AUTO_CLOSE, TIME_DATA_FETCHING } from '@/configs/toasts';

export const taskSucceed = () => {
  toast.success('Task is successfully created', { position: toast.POSITION.BOTTOM_CENTER });
};

export const taskNotCompleted = () => {
  toast.error('Error notification', {
    position: toast.POSITION.BOTTOM_CENTER,
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
