import type { CSSProp } from 'styled-components';

import type { HTMLAttributes } from 'react';

import { calculateToastDuration } from '@utils/calculateToastDuration';

import { toastActions } from '@stores/layout/toastStore';

import type { Color, ToastPosition } from '@type/style';

import { StyledToast } from './Toast.style';

export interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  toastId: number;
  message: string;
  position?: `${ToastPosition['column']}-${ToastPosition['row']}`;
  color?: Color;
  css?: CSSProp;
}

const Toast = ({ toastId, message, ...props }: ToastProps) => {
  const { deleteToast } = toastActions;

  const duration = calculateToastDuration(message);

  setTimeout(() => {
    deleteToast(toastId);
  }, duration * 1000);

  return (
    <StyledToast role="alert" aria-live="assertive" duration={duration} {...props}>
      {message}
    </StyledToast>
  );
};

export default Toast;
