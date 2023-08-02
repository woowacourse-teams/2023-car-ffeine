import { css } from 'styled-components';

import type { BorderRadiusDirectionType } from 'types/style';

export const borderRadius = (direction: BorderRadiusDirectionType) => css`
  ${direction === 'all' && 'border-radius: 0;'}
  ${direction === 'top' && 'border-top-left-radius: 0;'}
  ${direction === 'top' && 'border-top-right-radius: 0;'}
  ${direction === 'bottom' && 'border-bottom-left-radius: 0;'}
  ${direction === 'bottom' && 'border-bottom-right-radius: 0;'}
  ${direction === 'left' && 'border-top-left-radius: 0;'}
  ${direction === 'left' && 'border-bottom-left-radius: 0;'}
`;

export const pillStyle = css`
  height: 3.6rem;
  padding-top: 0;
  padding-bottom: 0;
  line-height: 1.8rem;
  font-size: 1.5rem;
  border-radius: 2.1rem;
`;

export const getSize = (size: string | number) => {
  if (size !== undefined) {
    return typeof size === 'number' ? `${size}rem` : size;
  }
  return 'auto';
};
