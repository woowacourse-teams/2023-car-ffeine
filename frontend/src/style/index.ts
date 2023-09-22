import { css } from 'styled-components';

import type { BorderRadiusDirectionType, Color, ToastPosition } from '@type/style';

export const borderRadius = (direction: BorderRadiusDirectionType) => css`
  ${direction === 'all' && 'border-radius: 0;'}
  ${direction === 'top' && 'border-top-left-radius: 0;'}
  ${direction === 'top' && 'border-top-right-radius: 0;'}
  ${direction === 'bottom' && 'border-bottom-left-radius: 0;'}
  ${direction === 'bottom' && 'border-bottom-right-radius: 0;'}
  ${direction === 'left' && 'border-top-left-radius: 0;'}
  ${direction === 'left' && 'border-bottom-left-radius: 0;'}
`;

export const pillStyle = css`
  height: 3.6rem;
  padding-top: 0;
  padding-bottom: 0;
  line-height: 1.8rem;
  font-size: 1.5rem;
  border-radius: 2.1rem;
`;

export const getSize = (size: string | number) => {
  if (size !== undefined) {
    return typeof size === 'number' ? `${size}rem` : size;
  }
  return 'auto';
};

export const getColor = (color?: Color) => {
  switch (color) {
    case 'primary':
      return '#2a6cd8';
    case 'secondary':
      return '#212529BF';
    case 'success':
      return '#198754';
    case 'error':
      return '#dc3545';
    case 'warning':
      return '#ffc107';
    case 'info':
      return '#0dcaf0';
    case 'light':
      return '#f8f9fa';
    case 'dark':
      return '#212529';
    default:
      return '#2a6cd8';
  }
};

export const getHoverColor = (color?: Color) => {
  switch (color) {
    case 'primary':
      return '#0b5ed7';
    case 'secondary':
      return '#495057';
    case 'success':
      return '#147a3d';
    case 'error':
      return '#c82333';
    case 'warning':
      return '#e0a800';
    case 'info':
      return '#0da8d6';
    case 'light':
      return '#f8f9fa';
    case 'disable':
      return '#9a9a9a';
    case 'dark':
      return '#16181b';
    default:
      return '#0b5ed7';
  }
};

type ToastPositionProps = `${ToastPosition['column']}-${ToastPosition['row']}`;

export const getPopupAnimation = (position: ToastPositionProps, duration: number) => {
  return css`
    ${position.includes('top') ? 'top: 0' : 'bottom: 0'};
    ${position.includes('left') && 'left: 0'};
    ${position.includes('right') && 'right: 0'};
    ${position.includes('center') && 'left: 50%; transform: translateX(-50%);'};

    animation:
      fadeIn ${duration}s,
      PopUp 1s forwards;

    @keyframes fadeIn {
      0% {
        opacity: 0;
      }
      50% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }

    ${popup(position)}
  `;
};

const popup = (position: ToastPositionProps = 'bottom-center') => {
  const column = position.includes('top') ? 'top' : 'bottom';
  const row = position.includes('center')
    ? 'center'
    : position.includes('right')
    ? 'right'
    : 'left';

  return css`
    @keyframes PopUp {
      from {
        ${row === 'center' ? `${column}: 0; left: 50%;` : `${column}: 12%; ${row}: 0;`}
      }
      to {
        ${column}: 12%;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  `;
};
