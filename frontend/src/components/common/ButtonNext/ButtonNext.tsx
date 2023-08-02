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
            color: #052c65;
            background: #cfe2ff;
            border: 1px solid #9ec5fe;
          `;
        case 'secondary':
          return css`
            color: #2b2f32;
            background: #e9ecef;
            border: 1px solid #c4c8cb;
          `;
        case 'success':
          return css`
            color: #0a3622;
            background: #d1e7dd;
            border: 1px solid #a3cfbb;
          `;
        case 'error':
          return css`
            color: #58151c;
            background: #f8d7da;
            border: 1px solid #f1aeb5;
          `;
        case 'warning':
          return css`
            color: #664d03;
            background: #fff3cd;
            border: 1px solid #ffe69c;
          `;
        case 'info':
          return css`
            color: #055160;
            background: #cff4fc;
            border: 1px solid #9eeaf9;
          `;
        case 'light':
          return css`
            color: #495057;
            background: #fcfcfd;
            border: 1px solid #e9ecef;
          `;
        case 'dark':
          return css`
            color: #495057;
            background: #ced4da;
            border: 1px solid #adb5bd;
          `;
        default:
          return css`
            color: #495057;
            background: #fcfcfd;
            border: 1px solid #e9ecef;
          `;
      }
    }}
  `,
};

export default ButtonNext;
