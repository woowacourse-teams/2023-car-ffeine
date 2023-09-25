import styled, { css } from 'styled-components';

import type { ButtonNextProps } from '@common/ButtonNext/ButtonNext';
import { spacing } from '@common/systems';

import { getColor, getHoverColor } from '@style';

export const StyledButtonNext = styled.button<ButtonNextProps>`
  border-radius: 6px;
  ${({ pill }) => pill && 'border-radius: 20px;'}

  ${({ fullWidth }) => fullWidth && 'width: 100%;'}
  ${({ disabled }) => disabled && `cursor: unset;`}
  ${({ variant, color, disabled }) => {
    switch (variant) {
      case 'text':
        return css`
          color: ${disabled ? '#a0a0a0' : color === 'light' ? '#000' : getColor(color)};
          background: transparent;
          border: none;

          &:hover {
            background: ${disabled ? 'transparent' : '#1976d20a'};
          }
        `;
      case 'outlined':
        return css`
          color: ${disabled ? '#a0a0a0' : color === 'light' ? '#333' : getColor(color)};
          background: transparent;
          border: 1.5px solid ${disabled ? '#a0a0a0' : getColor(color)};

          &:hover {
            color: ${disabled ? '#a0a0a0' : color === 'light' ? '#333' : '#fff'};
            background: ${disabled ? 'transparent' : getHoverColor(color)};
          }
        `;
      case 'contained':
      default:
        return css`
          color: ${disabled ? '#a0a0a0' : color === 'light' ? '#000' : '#ffffff'};
          background: ${disabled ? '#e0e0e0' : getColor(color)};
          border: 1.5px solid ${disabled ? '#e0e0e0' : getColor(color)};

          &:hover {
            background: ${disabled ? '#e0e0e0' : getHoverColor(color)};
          }
        `;
    }
  }}

  padding: ${({ size }) => {
    switch (size) {
      case 'xs':
        return '2px 8px';
      case 'sm':
        return '4px 12px';
      case 'md':
        return '6px 16px';
      case 'lg':
        return '8px 20px';
      case 'xl':
        return '10px 24px';
      case 'xxl':
        return '12px 28px';
      default:
        return '6px 16px';
    }
  }};

  font-size: ${({ size }) => {
    switch (size) {
      case 'xs':
        return '14px';
      case 'sm':
        return '16px';
      case 'md':
        return '18px';
      case 'lg':
        return '20px';
      case 'xl':
        return '22px';
      case 'xxl':
        return '24px';
      default:
        return '18px';
    }
  }};

  ${spacing};

  ${({ css }) => css};
`;

export const StyledPureButton = styled.button<ButtonNextProps>`
  ${({ css }) => css};
`;
