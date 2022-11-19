import { useState } from 'react';

// Centralizes modal control
const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const close = () => setIsModalOpen(false);
  const open = () => setIsModalOpen(true);

  return { isModalOpen, close, open };
};

export default useModal;
