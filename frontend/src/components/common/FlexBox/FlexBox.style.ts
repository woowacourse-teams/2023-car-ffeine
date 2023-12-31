import styled, { css } from 'styled-components';

import { StyledBox } from '@common/Box/Box.style';
import type { FlexBoxProps } from '@common/FlexBox/FlexBox';
import { spacing } from '@common/styles/spacing';
import { addUnit } from '@common/utils/addUnit';

import { borderRadius } from '@style';

import type { BorderRadiusDirectionType } from '@type';

export const FLEX_BOX_ITEM_POSITION = {
  start: 'start',
  center: 'center',
  end: 'end',
  between: 'space-between',
} as const;

export type StyledFlexBoxType = Omit<
  FlexBoxProps,
  'noRadius' | 'rowGap' | 'columnGap' | 'justifyContent' | 'alignItems' | 'alignContent'
> & {
  $noRadius?: BorderRadiusDirectionType;
  $rowGap?: number;
  $columnGap?: number;
  $justifyContent?: keyof typeof FLEX_BOX_ITEM_POSITION;
  $alignItems?: keyof typeof FLEX_BOX_ITEM_POSITION;
  $alignContent?: keyof typeof FLEX_BOX_ITEM_POSITION;
};

const getGap = ({ gap, rowGap, columnGap }: Pick<FlexBoxProps, 'gap' | 'rowGap' | 'columnGap'>) => {
  if (gap !== undefined) {
    return addUnit(gap, 4);
  }

  const row = rowGap !== undefined ? addUnit(rowGap, 4) : '0.4rem';
  const column = columnGap !== undefined ? addUnit(columnGap, 4) : '0.4rem';

  return `${row} ${column}`;
};

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
}: Required<Pick<FlexBoxProps, 'direction' | 'layout'>>) => css`
  ${layout &&
  `justify-content: ${direction === 'row' ? LAYOUT[layout].justify : LAYOUT[layout].align}`};
  ${layout &&
  `align-items: ${direction === 'row' ? LAYOUT[layout].align : LAYOUT[layout].justify}`};
`;

export const StyledFlexBox = styled(StyledBox)<StyledFlexBoxType>`
  ${spacing};

  flex-wrap: ${({ nowrap }) => (nowrap ? 'nowrap' : 'wrap')};
  flex-direction: ${({ direction }) => (direction ? direction : 'row')};
  justify-content: ${({ $justifyContent }) => FLEX_BOX_ITEM_POSITION[$justifyContent]};
  align-items: ${({ $alignItems }) => FLEX_BOX_ITEM_POSITION[$alignItems]};
  align-content: ${({ $alignContent }) => FLEX_BOX_ITEM_POSITION[$alignContent]};
  gap: ${({ gap, $rowGap, $columnGap }) => getGap({ gap, rowGap: $rowGap, columnGap: $columnGap })};

  display: flex;
  font-size: 1.5rem;

  ${({ $noRadius }) => $noRadius && borderRadius($noRadius)};
  ${({ direction, layout }) => layoutStyle({ direction, layout })};

  ${({ css }) => css};
`;
