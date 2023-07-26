import styled from 'styled-components';

import type { ReactNode } from 'react';

interface ListItemProps {
  children: ReactNode;
  divider?: boolean;
  clickable?: boolean;
}

const ListItemWrapper = styled.li<ListItemProps>`
  padding: 1rem 2rem;
  ${({ divider }) => divider && `border-bottom: 0.0625rem solid #ccc;`}

  ${({ clickable }) =>
    clickable &&
    `
    cursor: pointer;
    &:hover {
      background-color: #f0f0f0;
    }
  `}
`;

const ListItem = ({ children, ...props }: ListItemProps) => {
  return <ListItemWrapper {...props}>{children}</ListItemWrapper>;
};

export default ListItem;
