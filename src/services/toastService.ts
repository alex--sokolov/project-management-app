import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const taskSucceed = () => {
  toast.success('Task is succesfully created', { position: toast.POSITION.BOTTOM_CENTER });
};

export const taskNotCompleted = () => {
  toast.error('Error notification', {
    position: toast.POSITION.BOTTOM_CENTER,
    autoClose: 8000,
  });
};

const resolveAfter3Sec = new Promise((resolve) => setTimeout(resolve, 3000));

export const dataFetching = () => {
  toast.promise(resolveAfter3Sec, {
    pending: 'Promise is pending',
    success: 'Promise resolved 👌',
    error: 'Promise rejected 🤯',
  });
};
