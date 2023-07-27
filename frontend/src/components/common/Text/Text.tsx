import styled, { css } from 'styled-components';
import type { CSSProp } from 'styled-components';

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

const Text = styled.p<{
  variant?: VariantType;
  mb?: number;
  align?: 'center' | 'left' | 'right';
  css?: CSSProp;
}>`
  margin-bottom: ${({ mb }) => (mb ? `${mb * 0.4}rem` : 0)};

  ${({ align }) => {
    switch (align) {
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
          text-align: left;
        `;
    }
  }}

  ${({ variant }) => {
    switch (variant) {
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

  ${({ css }) => css};
`;
export default Text;
