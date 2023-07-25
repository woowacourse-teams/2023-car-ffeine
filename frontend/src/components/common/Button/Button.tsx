import styled from 'styled-components';
import type { CSSProp } from 'styled-components';

import type { ButtonHTMLAttributes, MouseEventHandler } from 'react';

import { borderRadius, pillStyle } from '@style';

import type { BorderRadiusDirectionType } from 'types/style';

type VariantType = 'pill';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: VariantType;
  noRadius?: BorderRadiusDirectionType;
  shadow?: boolean;
  size?: keyof typeof BUTTON_PADDING_SIZE;
  outlined?: boolean;
  background?: string;
  css?: CSSProp;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const BUTTON_PADDING_SIZE = {
  xs: '0.3rem 0.8rem 0.4rem',
  sm: '0.7rem 1.2rem 0.8rem',
  md: '1.1rem 3.2rem 1.2rem',
  lg: '1.7rem 4rem 1.8rem',
  xl: '2.1rem 4.8rem 2.2rem',
} as const;

export const BUTTON_FONT_SIZE = {
  xs: '1.2rem',
  sm: '1.4rem',
  md: '1.6rem',
  lg: '2rem',
  xl: '2.2rem',
} as const;

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <S.Button type="button" {...props}>
      {children}
    </S.Button>
  );
};

const S = {
  Button: styled.button<ButtonProps>`
    padding: ${({ size }) => BUTTON_PADDING_SIZE[size] || 0};
    background: ${({ background }) => background || '#fff'};
    border: ${({ outlined }) => (outlined ? '0.15rem solid #000' : 'none')};
    font-size: ${({ size }) => BUTTON_FONT_SIZE[size] || '1.5rem'};
    box-shadow: ${({ shadow }) => `${shadow ? '0 0.3rem 0.8rem 0 gray' : 'none'}`};

    cursor: pointer;
    border-radius: 8px;
    text-align: center;

    ${({ noRadius }) => noRadius && borderRadius(noRadius)};
    ${({ variant }) => variant && pillStyle};

    ${({ css }) => css};
  `,
};

export default Button;
