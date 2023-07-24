import type { CSSProp } from 'styled-components';
import styled, { css } from 'styled-components';

import type { ButtonHTMLAttributes, MouseEventHandler } from 'react';

import type { DirectionType } from 'types/style';

type VariantType = 'pill';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: VariantType;
  noRadius?: DirectionType;
  shadow?: boolean;
  size?: keyof typeof BUTTON_PADDING_SIZE;
  outlined?: boolean;
  background?: string;
  css?: CSSProp;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const BUTTON_PADDING_SIZE = {
  xs: '3px 8px 4px',
  sm: '7px 12px 8px',
  md: '11px 32px 12px',
  lg: '17px 40px 18px',
  xl: '21px 48px 22px',
} as const;

export const BUTTON_FONT_SIZE = {
  xs: '12px',
  sm: '14px',
  md: '16px',
  lg: '20px',
  xl: '22px',
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
    border: ${({ outlined }) => (outlined ? '1.5px solid #000' : 'none')};
    font-size: ${({ size }) => BUTTON_FONT_SIZE[size] || '16px'};
    box-shadow: ${({ shadow }) => `${shadow ? '0 3px 8px 0 gray' : 'none'}`};

    cursor: pointer;
    border-radius: 8px;
    text-align: center;
    font-size: 1.5rem;

    ${({ noRadius }) => noRadius && borderRadius(noRadius)};
    ${({ variant }) => variant && pillStyle};

    ${({ css }) => css};
  `,
};

export const pillStyle = css`
  height: 36px;
  padding-top: 0;
  padding-bottom: 0;
  line-height: 18px;
  font-size: 16px;
  border-radius: 21px;
`;

export const borderRadius = (direction: DirectionType) => css`
  ${direction === 'all' && 'border-radius: 0;'}
  ${direction === 'top' && 'border-top-left-radius: 0;'}
  ${direction === 'top' && 'border-top-right-radius: 0;'}
  ${direction === 'bottom' && 'border-bottom-left-radius: 0;'}
  ${direction === 'bottom' && 'border-bottom-right-radius: 0;'}
`;

export default Button;
