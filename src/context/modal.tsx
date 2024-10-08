import { createContext, ReactNode, useContext, useState } from 'react';

interface ModalStore {
  isModalOpen: boolean;
  showModal: () => void;
  handleOk: () => void;
  handleCancel: () => void;
}

export default function ModalStore(): ModalStore {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return { isModalOpen, showModal, handleOk, handleCancel };
}

const ModalContext = createContext({ isModalOpen: false, showModal: () => {}, handleOk: () => {}, handleCancel: () => {} });

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const multiStepStore = ModalStore();

  return <ModalContext.Provider value={multiStepStore}>{children}</ModalContext.Provider>;
};
