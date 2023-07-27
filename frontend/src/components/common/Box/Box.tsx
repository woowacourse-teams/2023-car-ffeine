import type { CSSProp } from 'styled-components';
import styled from 'styled-components';

import type { ReactNode } from 'react';

export interface BoxProps {
  children?: ReactNode;
  border?: boolean;
  p?: number;
  px?: number;
  py?: number;
  pl?: number;
  pr?: number;
  pt?: number;
  pb?: number;
  css?: CSSProp;
}

const BoxWrapper = styled.div<BoxProps>`
  list-style-type: none;

  ${({ border }) => border && `border: 0.01rem solid #66666666; border-radius:0.4rem;`}

  ${({ p }) => p && `padding: ${p * 0.4}rem`};

  ${({ px }) =>
    px &&
    `
      padding-left: ${px * 0.4}rem;
      padding-right: ${px * 0.4}rem;
    `}
  ${({ py }) =>
    py &&
    `
      padding-top: ${py * 0.4}rem;
      padding-bottom: ${py * 0.4}rem;
    `}

  ${({ pl }) => pl && `padding-left: ${pl * 0.4}rem`};
  ${({ pr }) => pr && `padding-right: ${pr * 0.4}rem`};
  ${({ pt }) => pt && `padding-top: ${pt * 0.4}rem`};
  ${({ pb }) => pb && `padding-bottom: ${pb * 0.4}rem`};

  ${({ css }) => css};
`;

const Box = ({ children, ...props }: BoxProps) => {
  return <BoxWrapper {...props}>{children}</BoxWrapper>;
};

export default Box;
