import { Global } from '@emotion/react';

import { reset } from '@common/styles/reset';
import type { Size } from '@common/styles/size';
import { sizeStyle } from '@common/styles/size';
import type { Spacing } from '@common/styles/spacing';
import { spacingStyle } from '@common/styles/spacing';
import type { FourSides } from '@common/types/side';

import type { CommonProps } from '../types/common';
import type { Alignment } from './style/container.style';
import { borderStyle, positionStyle, widthStyle } from './style/container.style';

export interface WidthStyle {
  /** 너비가 부모 박스 너비에 맞춰(100%) 유동적으로 변함
   * @default false
   */
  fluid?: boolean;
  /** 양 옆에 마진(24px)이 생김
   * @default false
   */
  gutter?: boolean;
}
export interface ContainerProps extends WidthStyle, Size, Spacing, CommonProps {
  /** Container의 가로 위치 변경 가능
   * @default 'center'
   */
  position?: Alignment;
  /** 테두리에 둥글고(border-radius: 4px) 얇은 선(0.1px)이 생김
   * - 특정 방향(ex. 'left')을 넣으면 해당 부분만 얇은 선이 생김
   * @default false
   */
  border?: boolean | FourSides;
  /** 배경 색상 변경 가능 */
  bg?: string;
}

const Container = ({
  tag = 'div',
  position = 'center',
  fluid = false,
  gutter = false,
  children,
  border = false,
  bg,
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
          borderStyle(border),
          { background: bg },
        ]}
        {...attributes}
      >
        {children}
      </Tag>
    </>
  );
};

export default Container;
