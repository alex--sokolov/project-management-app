import { motion } from 'framer-motion';
import { Backdrop } from '@/services/modals';
import './Modal.scss';

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
  handleClose: () => void;
  isModalOpen: boolean;
  text: string;
  type: string;
};

export const Modal = ({ handleClose, text }: Props) => {
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="modal orange-gradient"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <p>{text}</p>
        <button className="button modal__button" onClick={handleClose}>
          Close
        </button>
      </motion.div>
    </Backdrop>
  );
};
