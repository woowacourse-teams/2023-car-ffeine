import type { BoxProps } from '@common/Box/Box';

import type { AxisType, BorderRadiusDirectionType } from '@type/style';

import type { FLEX_BOX_ITEM_POSITION, Layout } from './FlexBox.style';
import { StyledFlexBox } from './FlexBox.style';

export interface FlexBoxProps extends BoxProps {
  justifyContent?: keyof typeof FLEX_BOX_ITEM_POSITION;
  alignItems?: keyof typeof FLEX_BOX_ITEM_POSITION;
  alignContent?: keyof typeof FLEX_BOX_ITEM_POSITION;
  noRadius?: BorderRadiusDirectionType;
  direction?: AxisType;
  nowrap?: boolean;
  gap?: number;
  rowGap?: number;
  columnGap?: number;
  layout?: Layout;
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
      {...props}
    >
      {children}
    </StyledFlexBox>
  );
};

export default FlexBox;
