import type { CSSProp } from 'styled-components';
import styled, { css } from 'styled-components';

import type { Color } from '@type/style';

export interface AlertProps {
  color: Color;
  text: string;
  css?: CSSProp;
}

const AlertContainer = styled.div<{ $style: Omit<AlertProps, 'text'> }>`
  ${({ $style }) => {
    switch ($style.color) {
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
  padding: 2rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  font-size: 1.5rem;

  ${({ $style }) => $style.css}
`;

const Alert = ({ ...props }: AlertProps) => {
  return (
    <AlertContainer {...props} $style={{ ...props }}>
      {props.text}
    </AlertContainer>
  );
};

export default Alert;
