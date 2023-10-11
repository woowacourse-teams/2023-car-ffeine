import { css, styled } from 'styled-components';

import type { TextProps } from '@common/Text/Text';
import { commonStyle } from '@common/styles/common';
import { spacing } from '@common/styles/spacing';

export type StyledTextType = Omit<TextProps, 'lineClamp' | 'lineHeight'> & {
  $lineClamp?: number;
  $lineHeight?: number | string;
};

export const StyledText = styled.p<StyledTextType>`
  ${spacing};

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
          text-align: inherit;
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
      case 'pillbox':
        return css`
          font-size: 1.3rem;
          color: #4b4b4b;
          padding: 0.2rem 1.2rem 0.4rem;
          background: var(--light-color);
          border-radius: 6px;
        `;
      default:
        return css`
          font-size: 1.5rem;
        `;
    }
  }}

  font-size: ${({ fontSize }) => fontSize && `${fontSize}rem`};
  font-weight: ${({ weight }) => (weight === 'regular' ? 500 : weight)};

  ${({ $lineClamp }) =>
    $lineClamp &&
    `
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: ${$lineClamp};
        `}

  line-height: ${({ $lineHeight }) => $lineHeight};

  ${({ width, height, maxWidth, minWidth, maxHeight, minHeight, bgColor, color }) =>
    commonStyle({ width, height, maxWidth, minWidth, maxHeight, minHeight, bgColor, color })}

  ${({ css }) => css}
`;
