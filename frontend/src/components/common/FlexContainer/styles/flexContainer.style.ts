import { css } from '@emotion/react';

import type { FlexLayoutStyle, FlexContainerProps } from '../FlexContainer';

export const LAYOUT = {
  topLeft: {
    justify: 'start',
    align: 'start',
  },
  topCenter: {
    justify: 'center',
    align: 'start',
  },
  topRight: {
    justify: 'end',
    align: 'start',
  },
  centerLeft: {
    justify: 'start',
    align: 'center',
  },
  center: {
    justify: 'center',
    align: 'center',
  },
  centerRight: {
    justify: 'end',
    align: 'center',
  },
  bottomLeft: {
    justify: 'start',
    align: 'end',
  },
  bottomCenter: {
    justify: 'center',
    align: 'end',
  },
  bottomRight: {
    justify: 'end',
    align: 'end',
  },
} as const;
export type Layout = keyof typeof LAYOUT;

export const layoutStyle = ({
  direction,
  layout,
  justify,
  alignItems,
  alignContent,
}: Required<Pick<FlexContainerProps, 'direction'>> & FlexLayoutStyle) => css`
  ${layout &&
  `justify-content: ${direction === 'row' ? LAYOUT[layout].justify : LAYOUT[layout].align}`};
  ${layout &&
  `align-items: ${direction === 'row' ? LAYOUT[layout].align : LAYOUT[layout].justify}`};

  ${justify && `justify-content: ${justify}`};
  ${alignItems && `align-items: ${alignItems}`};
  ${alignContent && `align-content: ${alignContent}`};
`;

type NumberAndString = number | string;
export interface Gap {
  /**
   * 자식 박스가 여러 개일 경우, 박스 사이의 행/열 여백 변경 가능
      - [string] 단위까지 적어줘야 함 (ex. 8px, 10px 20px)
      - [number] 숫자만 적을 경우 px로 자동 변환
   */
  gap?: NumberAndString;
  /**
   * 자식 박스가 여러 개일 경우, 박스 사이의 행 여백 변경 가능
      - [string] 단위까지 적어줘야 함 (ex. 8px, 10px 20px)
      - [number] 숫자만 적을 경우 px로 자동 변환
   */
  rowGap?: NumberAndString;
  /**
   * 자식 박스가 여러 개일 경우, 박스 사이의 열 여백 변경 가능
      - [string] 단위까지 적어줘야 함 (ex. 8px, 10px 20px)
      - [number] 숫자만 적을 경우 px로 자동 변환
   */
  columnGap?: NumberAndString;
}

export const gapStyle = ({ gap, rowGap, columnGap }: Gap) => css`
  ${gap && `gap: ${typeof gap === 'string' ? gap : `${gap}px`}`};
  ${rowGap && `row-gap: ${typeof rowGap === 'string' ? rowGap : `${rowGap}px`}`};
  ${columnGap && `column-gap: ${typeof columnGap === 'string' ? columnGap : `${columnGap}px`}`};
`;
