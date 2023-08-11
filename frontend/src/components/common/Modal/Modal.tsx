import styled, { keyframes } from 'styled-components';

import type { MouseEvent, ReactNode } from 'react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  staticBackdrop?: boolean;
}

const Modal = ({ isOpen, onClose, children, staticBackdrop = false }: ModalProps) => {
  const handleClickModalContent = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleBackdropClick = () => {
    if (!staticBackdrop) {
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <ModalWrapper className="modal-open" onClick={handleBackdropClick}>
      <ModalContent onClick={handleClickModalContent}>{children}</ModalContent>
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

  z-index: 99999;
`;

const ModalContent = styled.div`
  background: #fff;
  margin: 1rem;
  border-radius: 1rem;
  width: 100%;
  max-width: 50rem;
  max-height: calc(100% - 4rem);
  overflow-y: auto;
`;
