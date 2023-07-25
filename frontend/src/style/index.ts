import { css } from 'styled-components';

import type { DirectionType } from 'types/style';

export const borderRadius = (direction: DirectionType) => css`
  ${direction === 'all' && 'border-radius: 0;'}
  ${direction === 'top' && 'border-top-left-radius: 0;'}
  ${direction === 'top' && 'border-top-right-radius: 0;'}
  ${direction === 'bottom' && 'border-bottom-left-radius: 0;'}
  ${direction === 'bottom' && 'border-bottom-right-radius: 0;'}
`;

export const pillStyle = css`
  height: 36px;
  padding-top: 0;
  padding-bottom: 0;
  line-height: 18px;
  font-size: 16px;
  border-radius: 21px;
`;
