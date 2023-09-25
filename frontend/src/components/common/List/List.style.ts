import styled from 'styled-components';

import { spacing } from '@common/systems';

import type { ListProps } from './List';

export type StyledListType = Omit<ListProps, 'fontSize'> & { $fontSize: number };

export const StyledList = styled.ul<StyledListType>`
  ${spacing};

  list-style-type: none;
  font-size: ${({ $fontSize }) => `${$fontSize}rem`};

  ${({ border }) => border && `border: 0.01rem solid #66666666; border-radius:0.4rem;`}

  ${({ css }) => css};
`;
