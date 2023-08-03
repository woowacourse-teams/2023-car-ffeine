import type { Color } from '../types/style';

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
