import styled, { css } from 'styled-components';

import React from 'react';

export type Color =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'error'
  | 'light'
  | 'dark';

export interface AlertProps {
  type: Color;
  message: string;
}

const AlertContainer = styled.div<AlertProps>`
  ${({ type }) => {
    switch (type) {
      case 'primary':
        return css`
          color: #052c65;
          background: #cfe2ff;
        `;
      case 'secondary':
        return css`
          color: #2b2f32;
          background: #e9ecef;
        `;
      case 'success':
        return css`
          color: #0a3622;
          background: #d1e7dd;
        `;
      case 'error':
        return css`
          color: #58151c;
          background: #f8d7da;
        `;
      case 'warning':
        return css`
          color: #664d03;
          background: #fff3cd;
        `;
      case 'info':
        return css`
          color: #055160;
          background: #cff4fc;
        `;
      case 'light':
        return css`
          color: #495057;
          background: #fcfcfd;
        `;
      case 'dark':
        return css`
          color: #495057;
          background: #ced4da;
        `;
      default:
        return css`
          color: #495057;
          background: #fcfcfd;
        `;
    }
  }}
  padding: 2rem;
  border-radius: 4px;
  margin-bottom: 10px;
  font-size: 1.5rem;
`;

const Alert = ({ ...props }: AlertProps) => {
  return <AlertContainer {...props}>{props.message}</AlertContainer>;
};

export default Alert;
