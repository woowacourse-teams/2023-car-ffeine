import { css } from '@emotion/react';

import type { ContainerProps } from '../Container';

export const ALIGNMENT = {
  left: '0',
  center: '0 auto',
  right: '0 0 0 auto',
};
export type Alignment = keyof typeof ALIGNMENT;

export const positionStyle = (position: Alignment) => css`
  ${position && `margin: ${ALIGNMENT[position]}`};
`;

export const widthStyle = ({ fluid, gutter }: Pick<ContainerProps, 'fluid' | 'gutter'>) => css`
  ${gutter && 'margin: 0 24px'};
  ${fluid && `width: ${gutter ? 'calc(100% - 48px)' : '100%'}`};
`;

const addUnitForBorder = (borderProp: number | string) => {
  return typeof borderProp === 'number' ? `${borderProp}px` : borderProp;
};
export const borderStyle = ({
  border,
  borderColor,
  borderWidth,
  borderRadius,
}: Pick<ContainerProps, 'border' | 'borderColor' | 'borderWidth' | 'borderRadius'>) => css`
  ${border === true && `border: 0.1px solid #66666666; border-radius: 4px;`}

  ${typeof border !== 'boolean' && `border-${border}: 0.1px solid #66666666`};

  ${borderColor !== undefined && `border-color: ${borderColor}`};
  ${borderWidth !== undefined && `border-width: ${addUnitForBorder(borderWidth)}`};

  ${borderRadius !== undefined && `border-radius:  ${addUnitForBorder(borderRadius)}`};
`;

export const overflowStyle = ({
  overflow,
  overflowX,
  overflowY,
}: Pick<ContainerProps, 'overflow' | 'overflowX' | 'overflowY'>) => css`
  ${overflow !== undefined && `overflow: ${overflow}`};
  ${overflowX !== undefined && `overflow-x: ${overflowX}`};
  ${overflowY !== undefined && `overflow-y: ${overflowY}`};
`;

// for Storybook
export const borderStyleArgTypes = {
  border: {
    options: [true, false, 'left', 'right', 'top', 'bottom'],
    control: {
      type: 'select',
    },
  },
  borderWidth: {
    control: {
      type: 'text',
    },
    description: `border 두께 변경 가능, **border가 false가 아닐 때 사용 가능**
    <br />- [string] 단위까지 적어줘야 함 (ex. 2px, 1%)
    <br />  🔷 스토리북에서는 string 🔷
    <br />- [number] 숫자만 적을 경우 px로 자동 변환
    `,
  },
  borderRadius: {
    control: {
      type: 'text',
    },
    description: `border 곡률 변경 가능
    <br />- [string] 단위까지 적어줘야 함 (ex. 2px, 1%)
    <br />  🔷 스토리북에서는 string 🔷
    <br />- [number] 숫자만 적을 경우 px로 자동 변환
    `,
  },
};
