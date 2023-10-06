import type { CSSProp } from 'styled-components';

import type { HTMLAttributes, ReactNode } from 'react';

import { StyledList } from '@common/List/List.style';
import type { SpacingProps } from '@common/styles/spacing';

export interface ListProps extends HTMLAttributes<HTMLUListElement>, SpacingProps {
  children: ReactNode;
  border?: boolean;
  fontSize?: number;
  css?: CSSProp;
}

const List = ({ children, fontSize, ...props }: ListProps) => {
  return (
    <StyledList $fontSize={fontSize} {...props}>
      {children}
    </StyledList>
  );
};

export default List;
