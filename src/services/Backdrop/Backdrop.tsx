import { useEffect } from 'react';
import { stateLogger } from '../stateLogger';
import { motion } from 'framer-motion';
import './Backdrop.scss';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Backdrop = ({ children, onClick }: any) => {
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
