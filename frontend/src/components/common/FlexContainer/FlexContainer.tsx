import styled from '@emotion/styled';

import type { ContainerProps } from '../Container/Container';
import Container from '../Container/Container';
import type { Gap, Layout } from './styles/flexContainer.style';
import { gapStyle, layoutStyle } from './styles/flexContainer.style';

export type BasicLayoutProps = Gap & ContainerProps;

export type FlexBasicLayout = 'start' | 'center' | 'end';
type FlexContentLayout = FlexBasicLayout | 'space-between' | 'space-around' | 'space-evenly';
export interface FlexLayoutStyle {
  /** Flex Container 안의 박스 위치 변경 가능 */
  layout?: Layout;
  /** justify-content 속성 사용 가능 */
  justify?: FlexContentLayout;
  /** align-items 속성 사용 가능 */
  alignItems?: FlexBasicLayout | 'stretch';
  /** align-content 속성 사용 가능 */
  alignContent?: FlexContentLayout | 'stretch';
}

export interface FlexContainerProps extends FlexLayoutStyle, BasicLayoutProps {
  /**
   * 정렬 방향
    - row: Flex Container 안의 박스 가로 정렬
    - column: Flex Container 안의 박스 세로 정렬
  */
  direction?: 'row' | 'column';
  /**
   * 감싸기 여부
    - true: Flex Container 안의 박스가 Flex Container 바깥으로 나가지 않게 함
    - false: Flex Container 안의 박스의 너비가 Flex Container 보다 클 경우 바깥으로 빠져 나감
  * @default false
  */
  wrap?: boolean;
  /**
   * Flex Container 안의 박스 순서를 거꾸로 변경 가능
  - true: Flex Container 안의 박스 순서가 정반대가 됨
  - false: Flex Container 안의 박스 순서가 원래와 같음
  * @default false
  */
  reverse?: boolean;
}

const StyledFlexContainer = styled(Container)`
  display: flex;
`;

const FlexContainer = ({
  layout,
  direction = 'row',
  wrap = false,
  reverse = false,
  justify,
  alignItems,
  alignContent,
  gap,
  rowGap,
  columnGap,
  position = 'center',
  ...attributes
}: FlexContainerProps) => {
  return (
    <StyledFlexContainer
      css={[
        wrap && { flexWrap: 'wrap' },
        { flexDirection: `${direction}${reverse ? '-reverse' : ''}` },
        layoutStyle({ direction, layout, justify, alignItems, alignContent }),
        gapStyle({ gap, rowGap, columnGap }),
      ]}
      position={position}
      {...attributes}
    />
  );
};

export default FlexContainer;
