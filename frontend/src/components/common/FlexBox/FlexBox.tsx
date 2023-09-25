import type { CSSProp } from 'styled-components';

import { type HTMLAttributes, type ReactNode } from 'react';

import type { FLEX_BOX_ITEM_POSITION } from '@common/FlexBox/FlexBox.style';
import { StyledFlexBox } from '@common/FlexBox/FlexBox.style';
import type { SpacingProps } from '@common/systems';

import type { AxisType, BorderRadiusDirectionType } from '@type/style';

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
    <StyledFlexBox
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
    </StyledFlexBox>
  );
};

export default FlexBox;
