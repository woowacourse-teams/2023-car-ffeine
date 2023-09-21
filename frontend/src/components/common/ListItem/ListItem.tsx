import type { CSSProp } from 'styled-components';
import styled from 'styled-components';

import type { HTMLAttributes, ReactNode } from 'react';

import type { SpacingProps } from '@common/systems';
import { spacing } from '@common/systems';

export interface ListItemProps extends HTMLAttributes<HTMLLIElement>, SpacingProps {
  children: ReactNode;
  divider?: boolean;
  noLastDivider?: boolean;
  css?: CSSProp;
  tag?: string;
}

const ListItem = ({ children, tag, ...props }: ListItemProps) => {
  const changeableTag = tag || 'li';

  return (
    <ListItemWrapper as={changeableTag} {...props} $style={{ ...props }}>
      {children}
    </ListItemWrapper>
  );
};

const ListItemWrapper = styled.li<{ $style: Omit<ListItemProps, 'children' | 'tag'> }>`
  padding: 1rem 2rem;

  ${spacing}
  ${({ $style }) => $style.divider && `border-bottom: 0.0625rem solid #ccc;`}
  &:last-child {
    border-bottom: ${({ $style }) => $style.noLastDivider && 0};
  }

  ${({ $style }) => $style.css};
`;

export default ListItem;
