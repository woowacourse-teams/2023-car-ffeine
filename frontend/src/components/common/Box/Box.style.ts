import styled, { css } from 'styled-components';

import type { BoxProps } from '@common/Box/Box';
import { spacing } from '@common/styles/spacing';
import { addUnit } from '@common/utils/addUnit';

import { commonStyle } from '../styles/common';

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
  ${border === 'x' && `border-right: 0.1px solid #66666666; border-left: 0.1px solid #66666666;`}
  ${border === 'y' && `border-top: 0.1px solid #66666666; border-bottom: 0.1px solid #66666666;`}

  ${borderColor !== undefined && `border-color: ${borderColor}`};
  ${borderWidth !== undefined && `border-width: ${addUnitForBorder(borderWidth)}`};

  ${borderRadius !== undefined && `border-radius:  ${addUnitForBorder(borderRadius)}`};
`;

export const StyledBox = styled.div<BoxProps>`
  ${spacing}

  ${({ border, borderColor, borderWidth, borderRadius }) =>
    borderStyle({ border, borderColor, borderWidth, borderRadius })}

    ${({ width, height, maxWidth, minWidth, maxHeight, minHeight, bgColor, color }) =>
    commonStyle({ width, height, maxWidth, minWidth, maxHeight, minHeight, bgColor, color })}

  ${({ position }) => position && `position: ${position}`};
  ${({ top }) => top !== undefined && `top: ${addUnit(top)}`};
  ${({ right }) => right !== undefined && `right: ${addUnit(right)}`};
  ${({ bottom }) => bottom !== undefined && `bottom: ${addUnit(bottom)}`};
  ${({ left }) => left !== undefined && `left: ${addUnit(left)}`};

  ${({ css }) => css};
`;
