import type { CSSProp } from 'styled-components';
import styled from 'styled-components';

import type { HTMLAttributes, ReactNode } from 'react';

import type { SpacingProps } from '@common/systems';
import { spacing } from '@common/systems';

export interface ListProps extends HTMLAttributes<HTMLUListElement>, SpacingProps {
  children: ReactNode;
  border?: boolean;
  fontSize?: number;
  css?: CSSProp;
}

const List = ({ children, ...props }: ListProps) => {
  return <ListWrapper $style={{ ...props }}>{children}</ListWrapper>;
};

const ListWrapper = styled.ul<{ $style: Omit<ListProps, 'children'> }>`
  ${spacing};

  list-style-type: none;
  font-size: ${({ $style }) => `${$style.fontSize}rem`};

  ${({ $style }) => $style.border && `border: 0.01rem solid #66666666; border-radius:0.4rem;`}

  ${({ $style }) => $style.css};
`;

export default List;
