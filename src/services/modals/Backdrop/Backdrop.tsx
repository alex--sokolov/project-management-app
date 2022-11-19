import { ReactNode, useEffect } from 'react';
import { stateLogger } from '../../stateLogger';
import { motion } from 'framer-motion';
import './Backdrop.scss';

type Props = {
  onClick: () => void;
  children: ReactNode;
};

const Backdrop = ({ children, onClick }: Props) => {
  // Log state
  useEffect(() => {
    stateLogger('Backdrop', true);
    return () => stateLogger('Backdrop', false);
  }, []);

  return (
    <motion.div
      className="backdrop"
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;
