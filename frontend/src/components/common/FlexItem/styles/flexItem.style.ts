import { css } from 'styled-components';

import type { FlexItemProps } from '../FlexItem';

export const flexItemStyle = ({ order, shrink, grow, flex, alignSelf }: FlexItemProps) => css`
  ${order && `order: ${order}`};
  ${shrink && `flex-shrink: ${shrink}`};
  ${grow && `flex-grow: ${grow}`};
  ${flex && `flex: ${flex}`};
  ${alignSelf && `align-self: ${alignSelf}`};
`;
