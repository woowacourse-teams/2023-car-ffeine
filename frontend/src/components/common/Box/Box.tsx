import type { CSSProp } from 'styled-components';
import styled from 'styled-components';

import type { ReactNode } from 'react';

export interface BoxProps {
  children: ReactNode;
  css?: CSSProp;
}

const BoxWrapper = styled.div<BoxProps>`
  list-style-type: none;

  ${({ css }) => css};
`;

const Box = ({ children, ...props }: BoxProps) => {
  return <BoxWrapper {...props}>{children}</BoxWrapper>;
};

export default Box;
