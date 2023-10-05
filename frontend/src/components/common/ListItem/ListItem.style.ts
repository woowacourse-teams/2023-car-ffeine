import styled from 'styled-components';

import type { ListItemProps } from '@common/ListItem/ListItem';
import { spacing } from '@common/styles/spacing';

export const StyledListItem = styled.li<ListItemProps>`
  padding: 1rem 2rem;

  ${spacing};

  ${({ divider }) => divider && `border-bottom: 0.0625rem solid #ccc;`}
  &:last-child {
    border-bottom: ${({ NoLastDivider }) => NoLastDivider && 0};
  }

  ${({ css }) => css};
`;
