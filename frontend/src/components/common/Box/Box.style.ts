import styled, { css } from 'styled-components';

import type { BoxProps } from '@common/Box/Box';
import { spacing } from '@common/systems';

const addUnitForBorder = (borderProp: number | string) => {
  return typeof borderProp === 'number' ? `${borderProp}px` : borderProp;
};
const borderStyle = ({
  border,
  borderColor,
  borderWidth,
  borderRadius,
}: Pick<BoxProps, 'border' | 'borderColor' | 'borderWidth' | 'borderRadius'>) => css`
  ${border === true && `border: 0.1px solid #66666666; border-radius: 4px;`}

  ${typeof border !== 'boolean' && `border-${border}: 0.1px solid #66666666`};

  ${borderColor !== undefined && `border-color: ${borderColor}`};
  ${borderWidth !== undefined && `border-width: ${addUnitForBorder(borderWidth)}`};

  ${borderRadius !== undefined && `border-radius:  ${addUnitForBorder(borderRadius)}`};
`;

export const StyledBox = styled.div<BoxProps>`
  ${spacing}

  ${({ border, borderColor, borderWidth, borderRadius }) =>
    borderStyle({ border, borderColor, borderWidth, borderRadius })}

  height: ${({ height }) => (typeof height === 'string' ? height : `${height * 0.4}rem`)};
  min-height: ${({ minHeight }) => (typeof minHeight === 'string' ? minHeight : `${minHeight}rem`)};
  max-height: ${({ maxHeight }) => (typeof maxHeight === 'string' ? maxHeight : `${maxHeight}rem`)};

  width: ${({ width }) => (typeof width === 'string' ? width : `${width * 0.4}rem`)};
  min-width: ${({ minWidth }) => (typeof minWidth === 'string' ? minWidth : `${minWidth}rem`)};
  max-width: ${({ maxWidth }) => (typeof maxWidth === 'string' ? maxWidth : `${maxWidth}rem`)};

  ${({ bgColor }) => bgColor && `background: ${bgColor}`};
  ${({ color }) => color && `color: ${color}`};

  ${({ position }) => position && `position: ${position}`};
  ${({ top }) => top && `top: ${top * 0.4}rem`};
  ${({ right }) => right && `right: ${right * 0.4}rem`};
  ${({ bottom }) => bottom && `bottom: ${bottom * 0.4}rem`};
  ${({ left }) => left && `left: ${left * 0.4}rem`};

  ${({ css }) => css};
`;
