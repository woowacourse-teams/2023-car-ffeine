import type { CSSProp } from 'styled-components';
import styled, { css } from 'styled-components';

import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from 'react';
import { forwardRef } from 'react';

import type { SpacingProps } from '@common/systems';
import { spacing } from '@common/systems';

import { getColor, getHoverColor } from '@style';

import type { Color, Size } from '@type/style';

export interface ButtonNextProps extends SpacingProps, ButtonHTMLAttributes<HTMLButtonElement> {
  noTheme?: boolean;
  variant?: 'text' | 'outlined' | 'contained';
  size?: Size;
  children?: ReactNode;
  color?: Color;
  disabled?: boolean;
  fullWidth?: boolean;
  pill?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  css?: CSSProp;
}

const ButtonNext = ({ children, noTheme, ...props }: ButtonNextProps) => {
  return noTheme ? (
    <S.PureButton $style={{ ...props }}>{children}</S.PureButton>
  ) : (
    <S.Button $style={{ ...props }}>{children}</S.Button>
  );
};

const S = {
  Button: styled.button<{ $style: Omit<ButtonNextProps, 'children' | 'noTheme'> }>`
    border-radius: 6px;
    ${({ $style }) => $style.pill && 'border-radius: 20px;'}

    ${({ $style }) => $style.fullWidth && 'width: 100%;'}
    ${({ $style }) => $style.disabled && `cursor: unset;`}
    ${({ $style }) => {
      switch ($style.variant) {
        case 'text':
          return css`
            color: ${$style.disabled
              ? '#a0a0a0'
              : $style.color === 'light'
              ? '#000'
              : getColor($style.color)};
            background: transparent;
            border: none;

            &:hover {
              background: ${$style.disabled ? 'transparent' : '#1976d20a'};
            }
          `;
        case 'outlined':
          return css`
            color: ${$style.disabled
              ? '#a0a0a0'
              : $style.color === 'light'
              ? '#333'
              : getColor($style.color)};
            background: transparent;
            border: 1.5px solid ${$style.disabled ? '#a0a0a0' : getColor($style.color)};

            &:hover {
              color: ${$style.disabled ? '#a0a0a0' : $style.color === 'light' ? '#333' : '#fff'};
              background: ${$style.disabled ? 'transparent' : getHoverColor($style.color)};
            }
          `;
        case 'contained':
        default:
          return css`
            color: ${$style.disabled ? '#a0a0a0' : $style.color === 'light' ? '#000' : '#ffffff'};
            background: ${$style.disabled ? '#e0e0e0' : getColor($style.color)};
            border: 1.5px solid ${$style.disabled ? '#e0e0e0' : getColor($style.color)};

            &:hover {
              background: ${$style.disabled ? '#e0e0e0' : getHoverColor($style.color)};
            }
          `;
      }
    }}

    padding: ${({ $style }) => {
      switch ($style.size) {
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

    font-size: ${({ $style }) => {
      switch ($style.size) {
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

    ${({ $style }) => $style.css};
  `,
  PureButton: styled.button<{ $style: ButtonNextProps }>`
    ${({ $style }) => $style.css};
  `,
};

export default forwardRef(ButtonNext);
