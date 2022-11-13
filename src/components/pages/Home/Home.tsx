import { ToastContainer } from 'react-toastify';
import useModal from '../../../hooks/useModal';
import Modal from '../../../services/modalService/Modal/Modal';
import '../../../services/toastService';
import { dataFetching, taskNotCompleted, taskSucceed } from '../../../services/toastService';

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
