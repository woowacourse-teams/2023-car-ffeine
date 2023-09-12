import type { CSSProp } from 'styled-components';
import styled from 'styled-components';

import type { HTMLAttributes, ReactNode } from 'react';

import type { SpacingProps } from '@common/systems';
import { spacing } from '@common/systems';

export interface ListItemProps extends HTMLAttributes<HTMLLIElement>, SpacingProps {
  children: ReactNode;
  divider?: boolean;
  NoLastDivider?: boolean;
  css?: CSSProp;
  tag?: string;
}

const ListItem = ({ children, tag, ...props }: ListItemProps) => {
  const changeableTag = tag || 'li';

  return (
    <ListItemWrapper as={changeableTag} {...props}>
      {children}
    </ListItemWrapper>
  );
};

const ListItemWrapper = styled.li<ListItemProps>`
  padding: 1rem 2rem;

  ${spacing}

  ${({ divider }) => divider && `border-bottom: 0.0625rem solid #ccc;`}

  &:last-child {
    border-bottom: ${({ NoLastDivider }) => NoLastDivider && 0};
  }

  ${({ css }) => css};
`;

export default ListItem;
