import type { CSSProp } from 'styled-components';
import styled, { css } from 'styled-components';

import React from 'react';

import type { Color } from '../../../types/style';

export interface ButtonNextProps {
  noTheme?: boolean;
  variant?: 'text' | 'outlined' | 'contained';
  size?: 'small' | 'medium' | 'large';
  children?: string;
  color?: Color;
  disabled?: boolean;
  css?: CSSProp;
}

const ButtonNext = ({
  children,
  noTheme,
  variant,
  size,
  disabled,
  css,
  ...props
}: ButtonNextProps) => {
  return noTheme ? (
    <S.PureButton css={css} disabled={disabled}>
      {children}
    </S.PureButton>
  ) : (
    <S.Button variant={variant} size={size} color={props.color} disabled={disabled} {...props}>
      {children}
    </S.Button>
  );
};

const S = {
  Button: styled.button<ButtonNextProps>`
    border-radius: 4px;
    margin: 1px;
    padding: 6px 16px;
    cursor: pointer;
    ${({ variant, color, disabled }) => {
      switch (variant) {
        case 'text':
          return css`
            color: ${getColor(color)};
            background: transparent;
            border: none;

            &:hover {
              background: #1976d20a;
            }
          `;
        case 'outlined':
          return css`
            color: ${getColor(color)};
            background: transparent;
            border: 1px solid ${getColor(color)};

            &:hover {
              background: #1976d20a;
            }
          `;
        case 'contained':
        default:
          return css`
            color: ${color === 'light' ? '#000000' : '#ffffff'};
            background: ${getColor(color)};
            //border: 1px solid ${getColor(color)};

            ${!disabled &&
            css`
              box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.1);
            `}
            &:hover {
              background: ${getHoverColor(color)};
            }

            &:focus {
              outline: none;
              background: ${getHoverColor(color)};
              box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
            }
          `;
      }
    }}

    padding: ${({ size }) => {
      switch (size) {
        case 'small':
          return '4px 12px';
        case 'medium':
          return '6px 16px';
        case 'large':
          return '8px 20px';
        default:
          return '6px 16px';
      }
    }};

    font-size: ${({ size }) => {
      switch (size) {
        case 'small':
          return '16px';
        case 'medium':
          return '18px';
        case 'large':
          return '20px';
        default:
          return '18px';
      }
    }};

    ${({ css }) => css};
  `,
  PureButton: styled.button<ButtonNextProps>`
    ${({ css }) => css};
  `,
};

function getColor(color?: Color): string {
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
}

function getHoverColor(color?: Color): string {
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
}

export default ButtonNext;
