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
  minHeight?: number | string;
  maxHeight?: number | string;
  width?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
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

const FlexBox = ({ children, tag, ...props }: FlexBoxProps) => {
  const changeableTag = tag || 'div';

  return (
    <S.FlexBox as={changeableTag} {...props} $style={{ ...props }}>
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
  FlexBox: styled.div<{ $style: Omit<FlexBoxProps, 'children' | 'tag'> }>`
    ${spacing};

    width: ${({ $style }) => getSize($style.width)};
    min-width: ${({ $style }) =>
      typeof $style.minWidth === 'string' ? $style.minWidth : `${$style.minWidth}rem`};
    max-width: ${({ $style }) =>
      typeof $style.maxWidth === 'string' ? $style.maxWidth : `${$style.maxWidth}rem`};

    height: ${({ $style }) => getSize($style.height)};
    min-height: ${({ $style }) =>
      typeof $style.minHeight === 'string' ? $style.minHeight : `${$style.minHeight}rem`};
    max-height: ${({ $style }) =>
      typeof $style.maxHeight === 'string' ? $style.maxHeight : `${$style.maxHeight}rem`};

    flex-wrap: ${({ $style }) => ($style.nowrap ? 'nowrap' : 'wrap')};
    flex-direction: ${({ $style }) => ($style.direction ? $style.direction : 'row')};
    justify-content: ${({ $style }) => FLEX_BOX_ITEM_POSITION[$style.justifyContent]};
    align-items: ${({ $style }) => FLEX_BOX_ITEM_POSITION[$style.alignItems]};
    align-content: ${({ $style }) => FLEX_BOX_ITEM_POSITION[$style.alignContent]};
    gap: ${({ $style }) =>
      getGap({ gap: $style.gap, rowGap: $style.rowGap, columnGap: $style.columnGap })};
    ${({ $style }) => $style.background && `background: ${$style.background};`}
    border: ${({ $style }) => ($style.outlined ? '0.15rem solid #000' : 'none')};

    display: flex;
    border-radius: 1rem;
    font-size: 1.5rem;

    ${({ $style }) => $style.noRadius && borderRadius($style.noRadius)};

    ${({ $style }) => $style.css};
  `,
};

export default FlexBox;
