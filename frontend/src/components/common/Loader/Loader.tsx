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
        return '1.4rem';
      case 'md':
        return '1.6rem';
      case 'lg':
        return '1.8rem';
      case 'xl':
        return '2rem';
      case 'xxl':
        return '2.8rem';
      default:
        return size || '4.8rem';
    }
  }};
  height: ${({ size }) => {
    switch (size) {
      case 'xs':
        return '1.2rem';
      case 'sm':
        return '1.4rem';
      case 'md':
        return '1.6rem';
      case 'lg':
        return '1.8rem';
      case 'xl':
        return '2rem';
      case 'xxl':
        return '2.8rem';
      default:
        return size || '4.8rem';
    }
  }};
  border: 5px solid #fff;
  border-bottom-color: #ff3d00;
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
