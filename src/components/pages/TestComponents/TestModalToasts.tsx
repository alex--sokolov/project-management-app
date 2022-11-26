import './TestModalToasts.scss';

import { ToastContainer } from 'react-toastify';

import { useModal } from '@/hooks';
import { dataFetching, taskNotCompleted, taskSucceed } from '@/services/toasts';
import { Modal } from '@/services/modals';

export const TestModalToasts = () => {
  const { isModalOpen, close, open } = useModal();
  const modalType = 'Are you sure?';

  return (
    <>
      <button onClick={open} className="button">
        open modal
      </button>
      <button onClick={taskSucceed} className="button">
        task succeed
      </button>
      <button onClick={taskNotCompleted} className="button">
        task error
      </button>
      <button onClick={dataFetching} className="button">
        data fetching
      </button>
      <div className="max-w-3xl p-4 mx-auto pt-36 text-stone-700 font-serif text-lg space-y-4">
        <div className="example"></div>
        <div className="example"></div>
        <div className="example"></div>
      </div>
      <ToastContainer />
      <div>
        {isModalOpen && (
          <Modal isModalOpen={isModalOpen} text={modalType} type={modalType} handleClose={close} />
        )}
      </div>
    </>
  );
};
