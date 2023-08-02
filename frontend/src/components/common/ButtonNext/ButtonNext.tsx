import styled, { css } from 'styled-components';

export type Color =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'error'
  | 'light'
  | 'dark';

export interface ButtonNextProps {
  variant?: 'text' | 'outlined' | 'contained';
  children?: string;
  color?: Color;
}

const ButtonNext = ({ children, ...props }: ButtonNextProps) => {
  return <S.Button {...props}>{children}</S.Button>;
};

const S = {
  Button: styled.button<ButtonNextProps>`
    ${({ color }) => {
      switch (color) {
        case 'primary':
          return css`
            color: #ffffff;
            background: #0d6efd;
            border: 1px solid #9ec5fe;
          `;
        case 'secondary':
          return css`
            color: #ffffff;
            background: #212529;
            border: 1px solid #c4c8cb;
          `;
        case 'success':
          return css`
            color: #ffffff;
            background: #198754;
            border: 1px solid #a3cfbb;
          `;
        case 'error':
          return css`
            color: #ffffff;
            background: #dc3545;
            border: 1px solid #f1aeb5;
          `;
        case 'warning':
          return css`
            color: #ffffff;
            background: #ffc107;
            border: 1px solid #ffe69c;
          `;
        case 'info':
          return css`
            color: #ffffff;
            background: #0dcaf0;
            border: 1px solid #9eeaf9;
          `;
        case 'light':
          return css`
            color: #212529;
            background: #f8f9fa;
            border: 1px solid #e9ecef;
          `;
        case 'dark':
          return css`
            color: #ffffff;
            background: #212529;
            border: 1px solid #adb5bd;
          `;
        default:
          return css`
            color: #ffffff;
            background: #0d6efd;
            border: 1px solid #9ec5fe;
          `;
      }
    }}
  `,
};

export default ButtonNext;
