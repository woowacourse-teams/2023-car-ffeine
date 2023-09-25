import styled from 'styled-components';

import type { ListProps } from '@common/List/List';
import { spacing } from '@common/systems';

export type StyledListType = Omit<ListProps, 'fontSize'> & { $fontSize: number };

export const StyledList = styled.ul<StyledListType>`
  ${spacing};

  list-style-type: none;
  font-size: ${({ $fontSize }) => `${$fontSize}rem`};

  ${({ border }) => border && `border: 0.01rem solid #66666666; border-radius:0.4rem;`}

  ${({ css }) => css};
`;
