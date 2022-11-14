import { ToastContainer } from 'react-toastify';
import { dataFetching, taskNotCompleted, taskSucceed } from '@/services/toasts/toasts';
import useModal from '@/hooks/useModal';
import { Modal } from '@/services/modals';

export const Home = () => {
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
      <ToastContainer />
      <div>
        {isModalOpen && (
          <Modal isModalOpen={isModalOpen} text={modalType} type={modalType} handleClose={close} />
        )}
      </div>
    </>
  );
};
