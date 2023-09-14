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
  height?: number | string;
  minHeight?: string;
  maxHeight?: string;
  width?: number | string;
  minWidth?: string;
  maxWidth?: string;
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

export type StyledFlexBoxType = Omit<
  FlexBoxProps,
  | 'noRadius'
  | 'rowGap'
  | 'columnGap'
  | 'justifyContent'
  | 'alignItems'
  | 'alignContent'
  | 'minHeight'
  | 'maxHeight'
  | 'minWidth'
  | 'maxWidth'
> & {
  $noRadius?: BorderRadiusDirectionType;
  $rowGap?: number;
  $columnGap?: number;
  $justifyContent?: keyof typeof FLEX_BOX_ITEM_POSITION;
  $alignItems?: keyof typeof FLEX_BOX_ITEM_POSITION;
  $alignContent?: keyof typeof FLEX_BOX_ITEM_POSITION;
  $minHeight?: string;
  $maxHeight?: string;
  $minWidth?: string;
  $maxWidth?: string;
};

// TODO: tag가 바뀌었을 때 ref의 타입을 바꾸는 로직을 추가한다.
const FlexBox = ({
  children,
  tag,
  noRadius,
  rowGap,
  columnGap,
  justifyContent,
  alignItems,
  alignContent,
  minHeight,
  maxHeight,
  minWidth,
  maxWidth,
  ...props
}: FlexBoxProps) => {
  const changeableTag = tag || 'div';

  return (
    <S.FlexBox
      as={changeableTag}
      $noRadius={noRadius}
      $rowGap={rowGap}
      $columnGap={columnGap}
      $justifyContent={justifyContent}
      $alignItems={alignItems}
      $alignContent={alignContent}
      $minHeight={minHeight}
      $maxHeight={maxHeight}
      $minWidth={minWidth}
      $maxWidth={maxWidth}
      {...props}
    >
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

const S = {
  FlexBox: styled.div<StyledFlexBoxType>`
    ${spacing};

    width: ${({ width }) => getSize(width)};
    min-width: ${({ $minWidth }) => $minWidth};
    max-width: ${({ $maxWidth }) => $maxWidth};

    height: ${({ height }) => getSize(height)};
    min-height: ${({ $minHeight }) => $minHeight};
    max-height: ${({ $maxHeight }) => $maxHeight};

    flex-wrap: ${({ nowrap }) => (nowrap ? 'nowrap' : 'wrap')};
    flex-direction: ${({ direction }) => (direction ? direction : 'row')};
    justify-content: ${({ $justifyContent }) => FLEX_BOX_ITEM_POSITION[$justifyContent]};
    align-items: ${({ $alignItems }) => FLEX_BOX_ITEM_POSITION[$alignItems]};
    align-content: ${({ $alignContent }) => FLEX_BOX_ITEM_POSITION[$alignContent]};
    gap: ${({ gap, $rowGap, $columnGap }) =>
      getGap({ gap, rowGap: $rowGap, columnGap: $columnGap })};
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
