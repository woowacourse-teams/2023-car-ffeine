import type { CSSProp } from 'styled-components';

import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from 'react';
import { forwardRef } from 'react';

import type { SpacingProps } from '@common/styles/spacing';

import type { Color, Size } from '@type/style';

import { StyledButtonNext, StyledPureButton } from './ButtonNext.style';

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
    <StyledPureButton {...props}>{children}</StyledPureButton>
  ) : (
    <StyledButtonNext {...props}>{children}</StyledButtonNext>
  );
};

export default forwardRef(ButtonNext);
