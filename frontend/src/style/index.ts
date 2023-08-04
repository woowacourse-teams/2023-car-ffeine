import { css } from 'styled-components';

import type { BorderRadiusDirectionType } from 'types/style';
import type { Color } from 'types/style';

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
      return '#0d6efd';
    case 'secondary':
      return '#212529';
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
      return '#0d6efd';
  }
};
export const getHoverColor = (color?: Color) => {
  switch (color) {
    case 'primary':
      return '#0b5ed7';
    case 'secondary':
      return '#1a1d21';
    case 'success':
      return '#147a3d';
    case 'error':
      return '#c82333';
    case 'warning':
      return '#e0a800';
    case 'info':
      return '#0da8d6';
    case 'light':
      return '#e2e6ea';
    case 'dark':
      return '#16181b';
    default:
      return '#0b5ed7';
  }
};
