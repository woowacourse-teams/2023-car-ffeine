import styled, { keyframes } from 'styled-components';

import type { MouseEvent, ReactNode } from 'react';

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

export default Modal;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

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

  animation: ${fadeIn} 0.2s ease-in-out;
`;

const ModalContent = styled.div`
  background-color: #fff;
  margin: 1rem;
  padding: 2rem;
  border-radius: 1rem;
  width: 100%;
  max-width: 50rem;
  max-height: calc(100% - 4rem);
  overflow-y: auto;
`;
