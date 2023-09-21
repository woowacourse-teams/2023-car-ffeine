import type { CSSProp } from 'styled-components';
import styled from 'styled-components';

import { type HTMLAttributes, type ReactNode } from 'react';

import type { SpacingProps } from '@common/systems';
import { spacing } from '@common/systems';

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

const BoxWrapper = styled.div<{ $style: Omit<BoxProps, 'children'> }>`
  ${spacing}

  ${({ $style }) => $style.border && `border: 0.1px solid #66666666; border-radius:0.4rem;`}

  height: ${({ $style }) =>
    typeof $style.height === 'string' ? $style.height : `${$style.height * 0.4}rem`};
  min-height: ${({ $style }) =>
    typeof $style.minHeight === 'string' ? $style.minHeight : `${$style.minHeight}rem`};
  max-height: ${({ $style }) =>
    typeof $style.maxHeight === 'string' ? $style.maxHeight : `${$style.maxHeight}rem`};

  width: ${({ $style }) =>
    typeof $style.width === 'string' ? $style.width : `${$style.width * 0.4}rem`};
  min-width: ${({ $style }) =>
    typeof $style.minWidth === 'string' ? $style.minWidth : `${$style.minWidth}rem`};
  max-width: ${({ $style }) =>
    typeof $style.maxWidth === 'string' ? $style.maxWidth : `${$style.maxWidth}rem`};

  ${({ $style }) => $style.bgColor && `background: ${$style.bgColor}`};
  ${({ $style }) => $style.color && `color: ${$style.color}`};

  ${({ $style }) => $style.position && `position: ${$style.position}`};
  ${({ $style }) => $style.top && `top: ${$style.top * 0.4}rem`};
  ${({ $style }) => $style.right && `right: ${$style.right * 0.4}rem`};
  ${({ $style }) => $style.bottom && `bottom: ${$style.bottom * 0.4}rem`};
  ${({ $style }) => $style.left && `left: ${$style.left * 0.4}rem`};

  ${({ $style }) => $style.css};
`;

const Box = ({ children, ...props }: BoxProps) => {
  return (
    <BoxWrapper {...props} $style={{ ...props }}>
      {children}
    </BoxWrapper>
  );
};

export default Box;
