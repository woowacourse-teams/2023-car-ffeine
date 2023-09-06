import type { CSSProp } from 'styled-components';
import styled from 'styled-components';

import { type HTMLAttributes, type ReactNode } from 'react';

import type { SpacingProps } from '@common/systems';
import { spacing } from '@common/systems';

import { borderRadius, getSize } from '@style';

import type { AxisType, BorderRadiusDirectionType } from '@type/style';

export const FLEX_BOX_ITEM_POSITION = {
  start: 'start',
  center: 'center',
  end: 'end',
  between: 'space-between',
} as const;

export interface FlexBoxProps extends HTMLAttributes<HTMLDivElement>, SpacingProps {
  tag?: string;
  width?: string | number;
  height?: string | number;
  justifyContent?: keyof typeof FLEX_BOX_ITEM_POSITION;
  alignItems?: keyof typeof FLEX_BOX_ITEM_POSITION;
  alignContent?: keyof typeof FLEX_BOX_ITEM_POSITION;
  noRadius?: BorderRadiusDirectionType;
  outlined?: boolean;
  background?: string;
  direction?: AxisType;
  nowrap?: boolean;
  gap?: number;
  rowGap?: number;
  columnGap?: number;
  css?: CSSProp;
  children: ReactNode;
}

// TODO: tag가 바뀌었을 때 ref의 타입을 바꾸는 로직을 추가한다.
const FlexBox = ({ children, tag, noRadius, columnGap, ...props }: FlexBoxProps) => {
  const changeableTag = tag || 'div';

  return (
    <S.FlexBox as={changeableTag} $noRadius={noRadius} $columnGap={columnGap} {...props}>
      {children}
    </S.FlexBox>
  );
};

const getGap = ({ gap, rowGap, columnGap }: Pick<FlexBoxProps, 'gap' | 'rowGap' | 'columnGap'>) => {
  if (gap !== undefined) {
    return `${gap * 0.4}rem`;
  }

  const row = rowGap !== undefined ? rowGap * 0.4 : 0.4;
  const column = columnGap !== undefined ? columnGap * 0.4 : 0.4;

  return `${row}rem ${column}rem`;
};

export type StyledFlexBoxType = Omit<FlexBoxProps, 'noRadius' | 'columnGap'> & {
  $noRadius: BorderRadiusDirectionType;
  $columnGap: number;
};

const S = {
  FlexBox: styled.div<StyledFlexBoxType>`
    ${spacing};

    width: ${({ width }) => getSize(width)};
    height: ${({ height }) => getSize(height)};
    flex-wrap: ${({ nowrap }) => (nowrap ? 'nowrap' : 'wrap')};
    flex-direction: ${({ direction }) => (direction ? direction : 'row')};
    justify-content: ${({ justifyContent }) => FLEX_BOX_ITEM_POSITION[justifyContent]};
    align-items: ${({ alignItems }) => FLEX_BOX_ITEM_POSITION[alignItems]};
    align-content: ${({ alignContent }) => FLEX_BOX_ITEM_POSITION[alignContent]};
    gap: ${({ gap, rowGap, $columnGap }) => getGap({ gap, rowGap, columnGap: $columnGap })};
    ${({ background }) => background && `background: ${background};`}
    border: ${({ outlined }) => (outlined ? '0.15rem solid #000' : 'none')};

    display: flex;
    border-radius: 1rem;
    font-size: 1.5rem;

    ${({ $noRadius }) => $noRadius && borderRadius($noRadius)};

    ${({ css }) => css};
  `,
};

export default FlexBox;
