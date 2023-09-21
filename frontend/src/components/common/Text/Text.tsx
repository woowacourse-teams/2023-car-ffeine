import type { CSSProp } from 'styled-components';
import styled, { css } from 'styled-components';

import type { HTMLAttributes, ReactNode } from 'react';

import type { SpacingProps } from '@common/systems';
import { spacing } from '@common/systems';

const variantList = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'title',
  'subtitle',
  'label',
  'body',
  'caption',
] as const;

type VariantType = (typeof variantList)[number];

interface TextProps extends HTMLAttributes<HTMLElement>, SpacingProps {
  children: ReactNode;
  tag?: string;
  variant?: VariantType;
  align?: 'center' | 'left' | 'right';
  color?: string;
  lineClamp?: number;
  fontSize?: number;
  weight?: 'bolder' | 'bold' | 'regular' | 'normal' | 'lighter';
  lineHeight?: number | string;
  css?: CSSProp;
}

const Text = ({ children, tag, ...props }: TextProps) => {
  const changeableTag = tag || 'p';

  return (
    <S.Text as={changeableTag} {...props} $style={{ ...props }}>
      {children}
    </S.Text>
  );
};

const S = {
  Text: styled.p<{ $style: Omit<TextProps, 'children' | 'tag'> }>`
    ${spacing};

    ${({ $style }) => {
      switch ($style.align) {
        case 'center':
          return css`
            text-align: center;
          `;
        case 'left':
          return css`
            text-align: left;
          `;
        case 'right':
          return css`
            text-align: right;
          `;
        default:
          return css`
            text-align: inherit;
          `;
      }
    }}

    ${({ $style }) => {
      switch ($style.variant) {
        case 'h1':
          return css`
            font-size: 4.8rem;
            font-weight: bold;
          `;
        case 'h2':
          return css`
            font-size: 4rem;
            font-weight: bold;
          `;
        case 'h3':
          return css`
            font-size: 3.2rem;
            font-weight: bold;
          `;
        case 'h4':
          return css`
            font-size: 2.4rem;
            font-weight: bold;
          `;
        case 'h5':
          return css`
            font-size: 2rem;
            font-weight: bold;
          `;
        case 'h6':
          return css`
            font-size: 1.6rem;
            font-weight: bold;
          `;
        case 'title':
          return css`
            font-size: 2.2rem;
            font-weight: bold;
          `;
        case 'subtitle':
          return css`
            font-size: 1.6rem;
          `;
        case 'label':
          return css`
            font-size: 1.4rem;
          `;
        case 'body':
          return css`
            font-size: 1.5rem;
          `;
        case 'caption':
          return css`
            font-size: 1.2rem;
            color: #666;
          `;
        default:
          return css`
            font-size: 1.5rem;
          `;
      }
    }}

    font-size: ${({ $style }) => $style.fontSize && `${$style.fontSize}rem`};
    font-weight: ${({ $style }) => ($style.weight === 'regular' ? 500 : $style.weight)};
    color: ${({ $style }) => $style.color};

    ${({ $style }) =>
      $style.lineClamp &&
      `
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: ${$style.lineClamp};
        `}

    line-height: ${({ $style }) => $style.lineHeight};

    ${({ $style }) => $style.css}
  `,
};
export default Text;
