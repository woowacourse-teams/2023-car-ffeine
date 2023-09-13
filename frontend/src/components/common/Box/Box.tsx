import type { CSSProp } from 'styled-components';
import styled from 'styled-components';

import { type HTMLAttributes, type ReactNode } from 'react';

import type { SpacingProps } from '@common/systems';
import { spacing } from '@common/systems';

export interface BoxProps extends HTMLAttributes<HTMLDivElement>, SpacingProps {
  children?: ReactNode;
  border?: boolean;
  height?: number;
  minHeight?: number;
  maxHeight?: number;
  width?: number | string;
  minWidth?: number;
  maxWidth?: number;
  bgColor?: string;
  color?: string;
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
  css?: CSSProp;
}

const BoxWrapper = styled.div<BoxProps>`
  ${spacing}

  ${({ border }) => border && `border: 0.1px solid #66666666; border-radius:0.4rem;`}

  ${({ height }) => height && `height: ${height * 0.4}rem`};
  ${({ minHeight }) => minHeight && `min-height: ${minHeight * 0.4}rem`};
  ${({ maxHeight }) => maxHeight && `max-height: ${maxHeight * 0.4}rem`};

  width: ${({ width }) => (typeof width === 'string' ? width : `${width * 0.4}rem`)};
  ${({ minWidth }) => minWidth && `min-height: ${minWidth * 0.4}rem`};
  ${({ maxWidth }) => maxWidth && `max-height: ${maxWidth * 0.4}rem`};

  ${({ bgColor }) => bgColor && `background: ${bgColor}`};
  ${({ color }) => color && `color: ${color}`};

  ${({ position }) => position && `position: ${position}`};
  ${({ top }) => top && `top: ${top * 0.4}rem`};
  ${({ right }) => right && `right: ${right * 0.4}rem`};
  ${({ bottom }) => bottom && `bottom: ${bottom * 0.4}rem`};
  ${({ left }) => left && `left: ${left * 0.4}rem`};

  ${({ css }) => css};
`;

const Box = ({ children, ...props }: BoxProps) => {
  return <BoxWrapper {...props}>{children}</BoxWrapper>;
};

export default Box;
