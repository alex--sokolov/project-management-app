import { ToastContainer } from 'react-toastify';
import { dataFetching, taskNotCompleted, taskSucceed } from '@/services/toasts/toasts';
import useModal from '@/hooks/useModal';
import { Modal } from '@/services/modals';
import { Link } from 'react-router-dom';
import { useAuthUser } from '@/hooks/useAuthUser';
import { useQueryClient } from '@tanstack/react-query';
import Header from '@/components/Header/Header';
import './Home.scss';

export const Home = () => {
  const { isModalOpen, close, open } = useModal();
  const modalType = 'Are you sure?';
  return (
    <>
      <Header open={open}></Header>
      <main className="main">
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
            <Modal
              isModalOpen={isModalOpen}
              text={modalType}
              type={modalType}
              handleClose={close}
            />
          )}
        </div>
      </main>
    </>
  );
};
