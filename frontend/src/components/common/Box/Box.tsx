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
  m?: number;
  mx?: number;
  my?: number;
  ml?: number;
  mr?: number;
  mt?: number;
  mb?: number;
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

  ${({ m }) => m && `margin: ${m * 0.4}rem`};

  ${({ mx }) =>
    mx &&
    `
      margin-left: ${mx * 0.4}rem;
      margin-right: ${mx * 0.4}rem;
    `}
  ${({ my }) =>
    my &&
    `
      margin-top: ${my * 0.4}rem;
      margin-bottom: ${my * 0.4}rem;
    `}

  ${({ ml }) => ml && `margin-left: ${ml * 0.4}rem`};
  ${({ mr }) => mr && `margin-right: ${mr * 0.4}rem`};
  ${({ mt }) => mt && `margin-top: ${mt * 0.4}rem`};
  ${({ mb }) => mb && `margin-bottom: ${mb * 0.4}rem`};

  ${({ css }) => css};
`;

const Box = ({ children, ...props }: BoxProps) => {
  return <BoxWrapper {...props}>{children}</BoxWrapper>;
};

export default Box;
