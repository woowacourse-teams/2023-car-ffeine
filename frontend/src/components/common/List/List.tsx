import styled from 'styled-components';

import type { ReactNode } from 'react';

interface ListProps {
  children: ReactNode;
}

const ListWrapper = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const List = ({ children }: ListProps) => {
  return <ListWrapper>{children}</ListWrapper>;
};

export default List;
