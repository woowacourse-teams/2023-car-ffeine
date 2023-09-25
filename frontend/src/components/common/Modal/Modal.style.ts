import type { CSSProp } from 'styled-components';
import styled, { keyframes } from 'styled-components';

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const ModalWrapper = styled.div<{ css: CSSProp }>`
  display: flex;
  align-items: center;
  justify-content: center;

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background: rgba(0, 0, 0, 0.5);
  overflow: auto;

  animation: ${fadeIn} 0.2s ease-in-out;

  z-index: 9999;

  ${({ css }) => css};
`;

export const ModalContent = styled.div<{ noBackdrop: boolean; css: CSSProp }>`
  background: #fff;
  margin: 1rem;
  border-radius: 10px;
  max-height: calc(100% - 4rem);
  overflow-y: auto;

  ${({ noBackdrop, css }) => noBackdrop && css};
`;
