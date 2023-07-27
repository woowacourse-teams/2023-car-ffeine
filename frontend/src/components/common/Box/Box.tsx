import type { CSSProp } from 'styled-components';
import styled from 'styled-components';

import type { ReactNode } from 'react';

export interface BoxProps {
  children?: ReactNode;
  border?: boolean;
  p?: number;
  css?: CSSProp;
}

const BoxWrapper = styled.div<BoxProps>`
  list-style-type: none;

  ${({ border }) => border && `border: 0.01rem solid #66666666; border-radius:0.4rem;`}

  ${({ p }) => p && `padding: ${p * 0.4}rem`};

  ${({ css }) => css};
`;

const Box = ({ children, ...props }: BoxProps) => {
  return <BoxWrapper {...props}>{children}</BoxWrapper>;
};

export default Box;
