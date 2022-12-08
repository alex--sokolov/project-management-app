import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { sleep } from '@/utils/sleep';

import { TIME_AUTO_CLOSE, TIME_DATA_FETCHING } from '@/configs/toasts';
import { lang } from '@/i18n';
import translationEN from '@/data/i18n/translationEN.json';
import translationRU from '@/data/i18n/translationRU.json';

export const taskSucceed = () => {
  toast.success(
    lang === 'en'
      ? `${translationEN.toasts['task-create-success']}`
      : `${translationRU.toasts['task-create-success']}`,
    {
      position: toast.POSITION.BOTTOM_CENTER,
    }
  );
};

export const userDeleted = () => {
  toast.success(
    lang === 'en'
      ? `${translationEN.toasts['user-delete-success']}`
      : `${translationRU.toasts['user-delete-success']}`,
    {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: TIME_AUTO_CLOSE,
    }
  );
};

export const userLoggedOut = () => {
  toast.success(
    lang === 'en'
      ? `${translationEN.toasts['sign-out-success']}`
      : `${translationRU.toasts['sign-out-success']}`,
    {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: TIME_AUTO_CLOSE,
    }
  );
};

export const toastDismiss = () => {
  toast.dismiss();
};

export const userEdited = () => {
  toast.success(
    lang === 'en'
      ? `${translationEN.toasts['task-not-completed']}`
      : `${translationRU.toasts['task-not-completed']}`,
    { position: toast.POSITION.BOTTOM_CENTER }
  );
};

export const taskNotCompleted = () => {
  toast.error(
    lang === 'en'
      ? `${translationEN.toasts['user-update-success']}`
      : `${translationRU.toasts['user-update-success']}`,
    {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: TIME_AUTO_CLOSE,
    }
  );
};

export const boardError = (statusCode?: number, message?: string) => {
  const messageStr =
    statusCode && message
      ? `${message}(${statusCode})`
      : lang === 'en'
      ? `${translationEN.toasts['board-not-found']} (404)`
      : `${translationRU.toasts['board-not-found']} (404)`;
  toast.error(messageStr, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: TIME_AUTO_CLOSE,
  });
};

export const dataFetching = () => {
  return toast.promise(sleep(TIME_DATA_FETCHING), {
    pending:
      lang === 'en'
        ? `${translationEN.toasts['promise-pending']} (404)`
        : `${translationRU.toasts['promise-pending']} (404)`,
    success:
      lang === 'en'
        ? `${translationEN.toasts['promise-resolved']} 👌`
        : `${translationRU.toasts['promise-resolved']} 👌`,
    error:
      lang === 'en'
        ? `${translationEN.toasts['promise-rejected']} 🤯`
        : `${translationRU.toasts['promise-rejected']} 🤯`,
  });
};
