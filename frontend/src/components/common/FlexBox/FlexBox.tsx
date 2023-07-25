import { borderRadius } from 'style';
import type { CSSProp } from 'styled-components';
import styled from 'styled-components';

import type { HTMLAttributes, ReactNode } from 'react';

import type { AxisType, DirectionType } from 'types/style';

export const FLEX_BOX_ITEM_POSITION = {
  start: 'start',
  center: 'center',
  end: 'end',
  between: 'space-between',
} as const;

export interface FlexBoxProps extends HTMLAttributes<HTMLDivElement> {
  tag?: string;
  position?: keyof typeof FLEX_BOX_ITEM_POSITION;
  noRadius?: DirectionType;
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
    <S.FlexBox as={changeableTag} {...props}>
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
  FlexBox: styled.div<FlexBoxProps>`
    flex-wrap: ${({ nowrap }) => (nowrap ? 'nowrap' : 'wrap')};
    flex-direction: ${({ direction }) => (direction ? direction : 'row')};
    justify-content: ${({ position }) => FLEX_BOX_ITEM_POSITION[position] || 'start'};
    align-content: ${({ position }) => FLEX_BOX_ITEM_POSITION[position] || 'start'};
    gap: ${({ gap, rowGap, columnGap }) => getGap({ gap, rowGap, columnGap })};
    background: ${({ background }) => background || '#fff'};
    border: ${({ outlined }) => (outlined ? '0.15rem solid #000' : 'none')};

    display: flex;
    border-radius: 1rem;
    font-size: 1.5rem;

    ${({ noRadius }) => noRadius && borderRadius(noRadius)};

    ${({ css }) => css};
  `,
};

export default FlexBox;
