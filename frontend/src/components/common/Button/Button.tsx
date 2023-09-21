import type { CSSProp } from 'styled-components';
import styled, { css } from 'styled-components';

import type { ButtonHTMLAttributes, MouseEventHandler } from 'react';

import type { SpacingProps } from '@common/systems';
import { spacing } from '@common/systems';

import { borderRadius, getSize, pillStyle } from '@style';

import type { BorderRadiusDirectionType } from '@type/style';

type VariantType = 'pill' | 'label';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, SpacingProps {
  variant?: VariantType;
  width?: string | number;
  height?: string | number;
  noRadius?: BorderRadiusDirectionType;
  shadow?: boolean;
  size?: keyof typeof BUTTON_PADDING_SIZE;
  outlined?: boolean;
  background?: string;
  hover?: boolean;
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
  md: '1.5rem',
  lg: '2rem',
  xl: '2.2rem',
} as const;

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <S.Button type="button" {...props} $style={{ ...props }}>
      {children}
    </S.Button>
  );
};

const S = {
  Button: styled.button<{ $style: ButtonProps }>`
    width: ${({ $style }) => getSize($style.width)};
    height: ${({ $style }) => getSize($style.height)};
    padding: ${({ $style }) => BUTTON_PADDING_SIZE[$style.size] || 0};
    background: ${({ $style }) => $style.background || '#fff'};
    border: ${({ $style }) => ($style.outlined ? '0.15rem solid #000' : 'none')};
    font-size: ${({ $style }) => BUTTON_FONT_SIZE[$style.size] || 0};
    box-shadow: ${({ $style }) => `${$style.shadow ? '0 0.3rem 0.8rem 0 gray' : 'none'}`};

    cursor: pointer;
    border-radius: 1.2rem;
    text-align: center;

    ${spacing};
    ${({ $style }) => $style.noRadius && borderRadius($style.noRadius)};
    ${({ $style }) => {
      switch ($style.variant) {
        case 'pill':
          return pillStyle;
        case 'label':
          return labelButtonStyle;
        default:
          return;
      }
    }};

    &:hover {
      ${({ $style }) => $style.hover && 'background-color: #f0f0f0'};
    }

    ${({ $style }) => $style.css};
  `,
};

const labelButtonStyle = css`
  position: absolute;
  top: 1.2rem;
  right: -3.37rem;
  height: 6.2rem;
  padding: 0 0.6rem 0 0.2rem;
  background: #fcfcfc;
  border: 1.5px solid #e1e4eb;
  border-left: 0.2px solid #e1e4eb;

  ${borderRadius('left')}
`;

export default Button;
