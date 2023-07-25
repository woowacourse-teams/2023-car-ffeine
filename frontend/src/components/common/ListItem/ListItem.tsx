import styled from 'styled-components';

import type { ReactNode } from 'react';

interface ListItemProps {
  children: ReactNode;
}

const ListItemWrapper = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ListItem = ({ children }: ListItemProps) => {
  return <ListItemWrapper>{children}</ListItemWrapper>;
};

export default ListItem;
