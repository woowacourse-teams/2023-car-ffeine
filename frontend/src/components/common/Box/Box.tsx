import type { CSSProp } from 'styled-components';

import type { SpacingProps } from '@common/styles/spacing';
import type { BaseProps } from '@common/types/base';

import type { CommonStyleProps } from '../styles/common';
import { StyledBox } from './Box.style';

type FourSides = 'left' | 'right' | 'top' | 'bottom';

export interface BoxProps extends CommonStyleProps, SpacingProps, BaseProps {
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
  /** css position 기능 사용 가능 */
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
  /** css position 기능을 사용해야만 적용 가능
   * - [string] 단위까지 적어줘야 함 (ex. 2rem, 1%)
   * - [number] 숫자만 적을 경우 rem으로 자동 변환
   */
  top?: number | string;
  /** css position 기능을 사용해야만 적용 가능
   * - [string] 단위까지 적어줘야 함 (ex. 2rem, 1%)
   * - [number] 숫자만 적을 경우 rem으로 자동 변환
   */
  right?: number | string;
  /** css position 기능을 사용해야만 적용 가능
   * - [string] 단위까지 적어줘야 함 (ex. 2rem, 1%)
   * - [number] 숫자만 적을 경우 rem으로 자동 변환
   */
  bottom?: number | string;
  /** css position 기능을 사용해야만 적용 가능
   * - [string] 단위까지 적어줘야 함 (ex. 2rem, 1%)
   * - [number] 숫자만 적을 경우 rem으로 자동 변환
   */
  left?: number | string;
  css?: CSSProp;
}

const Box = ({ tag = 'div', border = false, children, ...props }: BoxProps) => {
  return (
    <StyledBox as={tag} border={border} {...props}>
      {children}
    </StyledBox>
  );
};

export default Box;
