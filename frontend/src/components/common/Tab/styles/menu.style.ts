import { css } from 'styled-components';

import type { IconPosition } from '../Menu';

export const tabMenuStyle = css`
  flex: 1;

  padding: 8px 0;

  color: #555;
  text-align: center;
  font-size: inherit;

  background: transparent;
  border: none;

  &:hover {
    color: #333;
  }
`;

export const getFlexDirection = (iconPosition: IconPosition) => {
  switch (iconPosition) {
    case 'top':
      return 'column';
    case 'bottom':
      return 'column-reverse';
    case 'left':
      return 'row';
    case 'right':
      return 'row-reverse';
  }
};

export const tabMenuWithIconStyle = (iconPosition: IconPosition) => css`
  display: flex;
  flex-direction: ${getFlexDirection(iconPosition)};
  gap: 2px;
  align-items: center;
  justify-content: center;
`;
