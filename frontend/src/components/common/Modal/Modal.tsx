import styled from 'styled-components';

import type { ReactNode, MouseEvent } from 'react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const handleModalContentClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <ModalWrapper className="modal-open" onClick={onClose}>
      <ModalContent onClick={handleModalContentClick}>{children}</ModalContent>
    </ModalWrapper>
  );
};

const ModalWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.5);
  overflow: auto;
`;

const ModalContent = styled.div`
  background-color: #fff;
  margin: 10px;
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  max-width: 500px;
  max-height: calc(100% - 40px);
  overflow-y: auto;
`;

export default Modal;
