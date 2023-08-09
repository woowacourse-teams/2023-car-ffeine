import type { CSSProp } from 'styled-components';
import { css, styled } from 'styled-components';

import type { HTMLAttributes } from 'react';

import { calculateToastDuration } from '@utils/calculateToastDuration';

import { toastActions } from '@stores/layout/toastStore';

import { getPopupAnimation } from '@style';

import type { Color, ToastPosition } from '@type/style';

export interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  toastId: number;
  message: string;
  position?: `${ToastPosition['column']}-${ToastPosition['row']}`;
  color?: Color;
  css?: CSSProp;
}

interface StyleProps extends Pick<ToastProps, 'color' | 'css' | 'position'> {
  duration?: number;
}

const Toast = ({ toastId, message, ...props }: ToastProps) => {
  const { deleteToast } = toastActions;

  const duration = calculateToastDuration(message);

  setTimeout(() => {
    deleteToast(toastId);
  }, duration * 1000);

  return (
    <S.Toast role="alert" aria-live="assertive" duration={duration} {...props}>
      {message}
    </S.Toast>
  );
};

const S = {
  Toast: styled.div<StyleProps>`
    position: fixed;
    width: max-content;
    max-width: 40rem;
    z-index: 99999;
    padding: 1.2rem 2.4rem;
    font-size: 1.5rem;
    text-align: center;
    word-break: keep-all;
    line-height: 1.5;
    border-radius: 28px;
    font-weight: 500;
    color: #fff;

    ${({ color = 'success' }) => getToastColor(color)};
    ${({ position, duration }) => getPopupAnimation(position, duration)}

    ${({ css }) => css}
  `,
};

// TODO: Alert랑 통일
export const getToastColor = (color?: Color) => {
  switch (color) {
    case 'primary':
      return css`
        background: #cfe2ff;
        border: 1.3px solid #9ec5fe;
        color: #052c65;
      `;
    case 'secondary':
      return css`
        border: 1.3px solid #dce5ff;
        background: #e9edf8;
        color: #585858;
      `;
    case 'success':
      return css`
        background: #d1e7dd;
        border: 1.3px solid #a3cfbb;
        color: #0a3622;
      `;
    case 'error':
      return css`
        background: #f8d7da;
        border: 1.3px solid #f1aeb5;
        color: #58151c;
      `;
    case 'warning':
      return css`
        border: 1.3px solid #ffe002;
        background: #fffce1;
        color: #664d03;
      `;
    case 'info':
      return css`
        border: 1.3px solid #aad5e2;
        background: #f3f8ff;
        color: #585858;
      `;
    case 'light':
      return css`
        border: 1.3px solid #d3d7db;
        background: #e2e6ea;
        color: #585858;
      `;
    case 'dark':
      return css`
        background: #ced4da;
        border: 1.3px solid #adb5bd;
        color: #495057;
      `;
  }
};

export default Toast;
