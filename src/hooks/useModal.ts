import { useState } from 'react';

// Centralizes modal control
export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const close = () => setIsModalOpen(false);
  const open = () => setIsModalOpen(true);

  return { isModalOpen, close, open };
};
