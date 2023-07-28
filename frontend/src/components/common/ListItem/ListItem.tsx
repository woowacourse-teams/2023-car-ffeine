import type { CSSProp } from 'styled-components';
import styled from 'styled-components';

import type { ReactNode } from 'react';

export interface ListItemProps {
  children: ReactNode;
  divider?: boolean;
  NoLastDivider?: boolean;
  css?: CSSProp;
}

const ListItem = ({ children, ...props }: ListItemProps) => {
  return <ListItemWrapper {...props}>{children}</ListItemWrapper>;
};

const ListItemWrapper = styled.li<ListItemProps>`
  padding: 1rem 2rem;
  ${({ divider }) => divider && `border-bottom: 0.0625rem solid #ccc;`}

  &:last-child {
    border-bottom: ${({ NoLastDivider }) => NoLastDivider && 0};
  }

  ${({ css }) => css};
`;

export default ListItem;
