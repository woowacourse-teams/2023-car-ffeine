import styled from 'styled-components';

import type { FlexBasicLayout } from '@common/FlexBox/FlexBox';
import type { CommonStyleProps } from '@common/styles/common';
import type { SpacingProps } from '@common/styles/spacing';
import type { BaseProps } from '@common/types/base';

import { flexItemStyle } from './styles/flexItem.style';

export interface FlexItemProps extends SpacingProps, CommonStyleProps, BaseProps {
  /** Flex Item 순서 변경 가능 */
  order?: number;
  /** Flex Item 크기를 줄일 수 있음 */
  shrink?: number;
  /** Flex Item 크기를 늘릴 수 있음 */
  grow?: number;
  /** Flex Item 크기를 조절할 수 있음 */
  flex?: string;
  /**
   * Flex Item 배치 변경 가능
    - Flex Container Direction Row: column 축 기준
    - Flex Container Direction Column: row 축 기준
   */
  alignSelf?: FlexBasicLayout | 'stretch';
}

const FlexItem = ({ tag = 'div', children, ...attributes }: FlexItemProps) => {
  return (
    <Item as={tag} {...attributes}>
      {children}
    </Item>
  );
};

const Item = styled.div<FlexItemProps>`
  ${({ order, shrink, grow, flex, alignSelf }) =>
    flexItemStyle({ order, shrink, grow, flex, alignSelf })}
`;

export default FlexItem;
