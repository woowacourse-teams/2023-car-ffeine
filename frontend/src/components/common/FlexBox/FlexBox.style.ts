import styled from 'styled-components';

import { StyledBox } from '@common/Box/Box.style';
import type { FlexBoxProps } from '@common/FlexBox/FlexBox';
import { spacing } from '@common/styles/spacing';

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
    return `${gap * 0.4}rem`;
  }

  const row = rowGap !== undefined ? rowGap * 0.4 : 0.4;
  const column = columnGap !== undefined ? columnGap * 0.4 : 0.4;

  return `${row}rem ${column}rem`;
};

export const StyledFlexBox = styled(StyledBox)<StyledFlexBoxType>`
  ${spacing};

  flex-wrap: ${({ nowrap }) => (nowrap ? 'nowrap' : 'wrap')};
  flex-direction: ${({ direction }) => (direction ? direction : 'row')};
  justify-content: ${({ $justifyContent }) => FLEX_BOX_ITEM_POSITION[$justifyContent]};
  align-items: ${({ $alignItems }) => FLEX_BOX_ITEM_POSITION[$alignItems]};
  align-content: ${({ $alignContent }) => FLEX_BOX_ITEM_POSITION[$alignContent]};
  gap: ${({ gap, $rowGap, $columnGap }) => getGap({ gap, rowGap: $rowGap, columnGap: $columnGap })};

  display: flex;
  border-radius: 10px;
  font-size: 1.5rem;

  ${({ $noRadius }) => $noRadius && borderRadius($noRadius)};

  ${({ css }) => css};
`;
