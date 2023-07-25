import styled from 'styled-components';

import type { ReactNode } from 'react';

interface ListItemProps {
  children: ReactNode;
}

const ListItemWrapper = styled.li`
  padding: 8px 16px;
  border-bottom: 1px solid #ccc;
`;

const ListItem = ({ children }: ListItemProps) => {
  return <ListItemWrapper>{children}</ListItemWrapper>;
};

export default ListItem;
