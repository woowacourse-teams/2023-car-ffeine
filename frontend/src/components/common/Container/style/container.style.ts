import { css } from '@emotion/react';

import type { FourSides } from '@common/types/side';

import type { WidthStyle } from '../Container';

export const ALIGNMENT = {
  left: '0',
  center: '0 auto',
  right: '0 0 0 auto',
};
export type Alignment = keyof typeof ALIGNMENT;

export const positionStyle = (position: Alignment) => css`
  ${position && `margin: ${ALIGNMENT[position]}`};
`;

export const CONTAINER_WIDTH = {
  xs: '320px',
  sm: '425px',
  md: '768px',
  lg: '960px',
  xl: '1140px',
  xxl: '1440px',
};
export type CustomSize = keyof typeof CONTAINER_WIDTH;

export const widthStyle = ({ fluid, gutter }: WidthStyle) => css`
  ${gutter && 'margin: 0 24px'};
  ${fluid && `width: ${gutter ? 'calc(100% - 48px)' : '100%'}`};
`;

export const borderStyle = (border: boolean | FourSides) => css`
  ${border === true && `border: 0.1px solid #66666666; border-radius: 4px;`}

  ${typeof border !== 'boolean' && `border-${border}: 0.1px solid #66666666;`}
`;

// for Storybook
export const containerStyleArgTypes = {
  border: {
    options: [true, false, 'left', 'right', 'top', 'bottom'],
    control: {
      type: 'select',
    },
  },
  bg: {
    control: {
      type: 'color',
    },
  },
};
