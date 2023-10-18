import type { BoxProps } from '@common/Box/Box';

import type { AxisType, BorderRadiusDirectionType } from '@type/style';

import type { FLEX_BOX_ITEM_POSITION, Layout } from './FlexBox.style';
import { StyledFlexBox } from './FlexBox.style';

export type FlexBasicLayout = 'start' | 'center' | 'end';

export interface FlexBoxProps extends BoxProps {
  /** justify-content 속성 사용 가능 */
  justifyContent?: keyof typeof FLEX_BOX_ITEM_POSITION;
  /** align-items 속성 사용 가능 */
  alignItems?: FlexBasicLayout | 'stretch';
  /** align-content 속성 사용 가능 */
  alignContent?: keyof typeof FLEX_BOX_ITEM_POSITION;
  /** 원하는 방향의 radius 제거 가능  */
  noRadius?: BorderRadiusDirectionType;
  /**
   * 정렬 방향
   - row: Flex Box 안의 박스 가로 정렬
   - column: Flex Box 안의 박스 세로 정렬
   */
  direction?: AxisType;
  /**
   * 감싸기 여부
   - true: Flex Box 안의 박스의 너비가 Flex Box 보다 클 경우 바깥으로 빠져 나감
   - false: Flex Box 안의 박스가 Flex Box 바깥으로 나가지 않게 함
   * @default false
   */
  nowrap?: boolean;
  /**
   * 자식 박스가 여러 개일 경우, 박스 사이의 행/열 여백 변경 가능
   - [string] 단위까지 적어줘야 함 (ex. 8px, 10px 20px)
   - [number] 숫자만 적을 경우 (prop * 0.4)rem으로 자동 변환
   */
  gap?: string | number;
  /**
   * 자식 박스가 여러 개일 경우, 박스 사이의 행 여백 변경 가능
   - [string] 단위까지 적어줘야 함 (ex. 8px, 10px 20px)
   - [number] 숫자만 적을 경우 (prop * 0.4)rem으로 자동 변환
   @default 0.4rem
   */
  rowGap?: string | number;
  /**
   * 자식 박스가 여러 개일 경우, 박스 사이의 열 여백 변경 가능
   - [string] 단위까지 적어줘야 함 (ex. 8px, 10px 20px)
   - [number] 숫자만 적을 경우 (prop * 0.4)rem 자동 변환
   */
  columnGap?: string | number;
  /** Flex Box 안의 박스 위치 변경 가능 */
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
