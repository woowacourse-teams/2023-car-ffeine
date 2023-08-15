import styled from 'styled-components';

import type { Size } from '@type';

export interface LoaderProps {
  size?: Size | string;
}

const Loader = styled.div<LoaderProps>`
  width: ${({ size }) => {
    switch (size) {
      case 'xs':
        return '1.2rem';
      case 'sm':
        return '1.6rem';
      case 'md':
        return '2.0rem';
      case 'lg':
        return '2.4rem';
      case 'xl':
        return '2.8rem';
      case 'xxl':
        return '3.2rem';
      default:
        return size || '2.0rem';
    }
  }};
  height: ${({ size }) => {
    switch (size) {
      case 'xs':
        return '1.2rem';
      case 'sm':
        return '1.6rem';
      case 'md':
        return '2.0rem';
      case 'lg':
        return '2.4rem';
      case 'xl':
        return '2.8rem';
      case 'xxl':
        return '3.2rem';
      default:
        return size || '2.0rem';
    }
  }};
  border: 3px solid #fff;
  border-bottom-color: #0d6efd;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Loader;
