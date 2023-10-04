import { Global } from '@emotion/react';

import { reset } from '@common/styles/reset';
import type { Size } from '@common/styles/size';
import { sizeStyle } from '@common/styles/size';
import type { Spacing } from '@common/styles/spacing';
import { spacingStyle } from '@common/styles/spacing';
import type { FourSides } from '@common/types/side';

import type { CommonProps } from '../types/common';
import type { Alignment } from './style/container.style';
import { borderStyle, overflowStyle, positionStyle, widthStyle } from './style/container.style';

export interface ContainerProps extends Size, Spacing, CommonProps {
  /** 너비가 부모 박스 너비에 맞춰(100%) 유동적으로 변함
   * @default false
   */
  fluid?: boolean;
  /** 양 옆에 마진(24px)이 생김
   * @default false
   */
  gutter?: boolean;
  /** Container의 가로 위치 변경 가능
   * @default 'center'
   */
  position?: Alignment;
  /** 테두리에 둥글고(border-radius: 4px) 얇은 선(0.1px, #66666666)이 생김
   * - 특정 방향(ex. 'left')을 넣으면 해당 부분만 얇은 선이 생김
   * @default false
   */
  border?: boolean | FourSides;
  /** border 색깔 변경 가능, **border가 false가 아닐 때 사용 가능** */
  borderColor?: string;
  /** border 두께 변경 가능, **border가 false가 아닐 때 사용 가능**
   *- [string] 단위까지 적어줘야 함 (ex. 2px, 1%)
   *- [number] 숫자만 적을 경우 px로 자동 변환
   */
  borderWidth?: number | string;
  /** border 곡률 변경 가능
   *- [string] 단위까지 적어줘야 함 (ex. 2px, 1%)
   *- [number] 숫자만 적을 경우 px로 자동 변환
   */
  borderRadius?: number | string;
  /** 배경 색상 변경 가능 */
  bgColor?: string;
  /** overflow 속성 사용 가능
   * @example overflow="auto hidden"
   */
  overflow?: string;
  /** X축에만 overflow 속성 적용 가능
   * @example overflowX="auto"
   */
  overflowX?: string;
  /** Y축에만 overflow 속성 적용 가능
   * @example overflowY="auto"
   */
  overflowY?: string;
  /** display 속성 적용 가능
   * @example display="block"
   */
  display?: string;
}

const Container = ({
  tag = 'div',
  position = 'center',
  fluid = false,
  gutter = false,
  children,
  border = false,
  borderColor,
  borderWidth,
  borderRadius,
  bgColor,
  overflow,
  overflowX,
  overflowY,
  display,
  ...attributes
}: ContainerProps) => {
  const Tag = tag;

  return (
    <>
      <Global styles={reset} />
      <Tag
        css={[
          positionStyle(position),
          widthStyle({ fluid, gutter }),
          sizeStyle({ ...attributes }),
          spacingStyle({ ...attributes }),
          borderStyle({ border, borderColor, borderWidth, borderRadius }),
          overflowStyle({ overflow, overflowX, overflowY }),
          bgColor && { background: bgColor },
          display && { display: display },
        ]}
        {...attributes}
      >
        {children}
      </Tag>
    </>
  );
};

export default Container;
