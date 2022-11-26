import './Backdrop.scss';

import { ReactNode, useEffect } from 'react';
import { motion } from 'framer-motion';

import { stateLogger } from '@/services/logger';

type Props = {
  onClick: () => void;
  children: ReactNode;
};

export const Backdrop = ({ children, onClick }: Props) => {
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
