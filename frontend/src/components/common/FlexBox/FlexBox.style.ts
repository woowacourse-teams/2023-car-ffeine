import styled from 'styled-components';

import type { FlexBoxProps } from '@common/FlexBox/FlexBox';
import { spacing } from '@common/systems';

import { borderRadius, getSize } from '@style';

import type { BorderRadiusDirectionType } from '@type';

export const FLEX_BOX_ITEM_POSITION = {
  start: 'start',
  center: 'center',
  end: 'end',
  between: 'space-between',
} as const;

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
  $minHeight?: number | string;
  $maxHeight?: number | string;
  $minWidth?: number | string;
  $maxWidth?: number | string;
};

const getGap = ({ gap, rowGap, columnGap }: Pick<FlexBoxProps, 'gap' | 'rowGap' | 'columnGap'>) => {
  if (gap !== undefined) {
    return `${gap * 0.4}rem`;
  }

  const row = rowGap !== undefined ? rowGap * 0.4 : 0.4;
  const column = columnGap !== undefined ? columnGap * 0.4 : 0.4;

  return `${row}rem ${column}rem`;
};

export const StyledFlexBox = styled.div<StyledFlexBoxType>`
  ${spacing};

  width: ${({ width }) => getSize(width)};
  min-width: ${({ $minWidth }) => (typeof $minWidth === 'string' ? $minWidth : `${$minWidth}rem`)};
  max-width: ${({ $maxWidth }) => (typeof $maxWidth === 'string' ? $maxWidth : `${$maxWidth}rem`)};

  height: ${({ height }) => getSize(height)};
  min-height: ${({ $minHeight }) =>
    typeof $minHeight === 'string' ? $minHeight : `${$minHeight}rem`};
  max-height: ${({ $maxHeight }) =>
    typeof $maxHeight === 'string' ? $maxHeight : `${$maxHeight}rem`};

  flex-wrap: ${({ nowrap }) => (nowrap ? 'nowrap' : 'wrap')};
  flex-direction: ${({ direction }) => (direction ? direction : 'row')};
  justify-content: ${({ $justifyContent }) => FLEX_BOX_ITEM_POSITION[$justifyContent]};
  align-items: ${({ $alignItems }) => FLEX_BOX_ITEM_POSITION[$alignItems]};
  align-content: ${({ $alignContent }) => FLEX_BOX_ITEM_POSITION[$alignContent]};
  gap: ${({ gap, $rowGap, $columnGap }) => getGap({ gap, rowGap: $rowGap, columnGap: $columnGap })};
  ${({ background }) => background && `background: ${background};`}
  border: ${({ outlined }) => (outlined ? '0.15rem solid #000' : 'none')};

  display: flex;
  border-radius: 1rem;
  font-size: 1.5rem;

  ${({ $noRadius }) => $noRadius && borderRadius($noRadius)};

  ${({ css }) => css};
`;
