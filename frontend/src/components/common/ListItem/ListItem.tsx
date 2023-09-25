import type { CSSProp } from 'styled-components';

import type { HTMLAttributes, ReactNode } from 'react';

import { StyledListItem } from '@common/ListItem/ListItem.style';
import type { SpacingProps } from '@common/systems';

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
    <StyledListItem as={changeableTag} {...props}>
      {children}
    </StyledListItem>
  );
};

export default ListItem;
