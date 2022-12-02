import { motion } from 'framer-motion';
import { Backdrop } from '@/services/modals';
import './Modal.scss';
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
  handleClick: (value: string) => string;
  isModalOpen: boolean;
  text: string;
};

export const Modal = ({ handleClick, text }: Props) => {
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
        <p>{text}</p>
        <button className="button modal__button" onClick={() => handleClick('yes')}>
          {EModal.yes}
        </button>
        <button className="button modal__button" onClick={() => handleClick('no')}>
          {EModal.no}
        </button>
      </motion.div>
    </Backdrop>
  );
};
