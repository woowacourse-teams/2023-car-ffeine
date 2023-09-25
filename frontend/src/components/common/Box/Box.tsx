import type { CSSProp } from 'styled-components';

import { type HTMLAttributes, type ReactNode } from 'react';

import type { SpacingProps } from '@common/systems';

import { StyledBox } from './Box.style';

export interface BoxProps extends HTMLAttributes<HTMLDivElement>, SpacingProps {
  children?: ReactNode;
  border?: boolean;
  height?: number | string;
  minHeight?: number | string;
  maxHeight?: number | string;
  width?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
  bgColor?: string;
  color?: string;
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
  css?: CSSProp;
}

const Box = ({ children, ...props }: BoxProps) => {
  return <StyledBox {...props}>{children}</StyledBox>;
};

export default Box;
