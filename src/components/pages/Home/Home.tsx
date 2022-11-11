import useModal from '../../../hooks/useModal';
import Modal from '../../../services/Modal/Modal';

export const Home = () => {
  const { modalOpen, close, open } = useModal();
  const modalType = 'Are you sure?';

  return (
    <>
      <button onClick={open}>open modal</button>
      <div>
        {modalOpen && (
          <Modal modalOpen={modalOpen} text={modalType} type={modalType} handleClose={close} />
        )}
      </div>
    </>
  );
};
