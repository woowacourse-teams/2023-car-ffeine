import type { CSSProp } from 'styled-components';

import type { MouseEvent, ReactNode } from 'react';

import { ModalContent, ModalWrapper } from './Modal.style';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  staticBackdrop?: boolean;
  noOverflowHidden?: boolean;
  noBackdrop?: boolean;
  css?: CSSProp;
}

const Modal = ({
  isOpen,
  onClose,
  children,
  staticBackdrop = false,
  noOverflowHidden,
  noBackdrop,
  css,
}: ModalProps) => {
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

  const modalContent = (
    <ModalContent noBackdrop onClick={handleClickModalContent} css={css}>
      {children}
    </ModalContent>
  );

  if (noBackdrop) {
    return modalContent;
  }

  return (
    <ModalWrapper
      className={noOverflowHidden && 'modal-open'}
      onClick={handleBackdropClick}
      css={css}
    >
      {modalContent}
    </ModalWrapper>
  );
};

export default Modal;
