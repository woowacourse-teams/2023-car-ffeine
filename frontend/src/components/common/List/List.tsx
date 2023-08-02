import type { CSSProp } from 'styled-components';
import styled from 'styled-components';

import type { ReactNode } from 'react';

export interface ListProps {
  children: ReactNode;
  p?: number;
  border?: boolean;
  css?: CSSProp;
}

const List = ({ children, ...props }: ListProps) => {
  return <ListWrapper {...props}>{children}</ListWrapper>;
};

const ListWrapper = styled.ul<ListProps>`
  list-style-type: none;
  ${({ p }) => p && `padding: ${p * 0.4}rem`};
  ${({ border }) => border && `border: 0.01rem solid #66666666; border-radius:0.4rem;`}

  ${({ css }) => css};
`;

export default List;
