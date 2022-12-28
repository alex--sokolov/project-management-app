import { motion } from 'framer-motion';
import { Backdrop } from './index';
import './ModalConfirm.scss';
import { EModal } from '@/types';

const dropIn = {
  hidden: {
    y: '-100vh',
    opacity: 0,
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: '100vh',
    opacity: 0,
  },
};

type Props = {
  handleClick: (value: string) => string | void;
  isModalOpen: boolean;
  text: string;
};

export const ModalConfirm = ({ handleClick, text }: Props) => {
  return (
    <Backdrop onClick={() => handleClick}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="modal orange-gradient"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <p style={{ margin: '50px' }}>{text}</p>
        <button
          className={`button modal__button button-${EModal.yes}`}
          onClick={() => handleClick('yes')}
        >
          {EModal.yes}
        </button>
        <button
          className={`button modal__button button-${EModal.no}`}
          onClick={() => handleClick('no')}
        >
          {EModal.no}
        </button>
      </motion.div>
    </Backdrop>
  );
};
