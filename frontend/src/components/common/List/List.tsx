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

const List = ({ children, fontSize, ...props }: ListProps) => {
  return (
    <ListWrapper $fontSize={fontSize} {...props}>
      {children}
    </ListWrapper>
  );
};

const ListWrapper = styled.ul<Omit<ListProps, 'fontSize'> & { $fontSize: number }>`
  ${spacing}

  list-style-type: none;
  font-size: ${({ $fontSize }) => `${$fontSize}rem`};

  ${({ border }) => border && `border: 0.01rem solid #66666666; border-radius:0.4rem;`}

  ${({ css }) => css};
`;

export default List;
