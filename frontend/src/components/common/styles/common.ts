import { css } from 'styled-components';

import { addUnit } from '@common/utils/addUnit';

export interface CommonStyleProps {
  width?: number | string;
  height?: number | string;
  maxWidth?: number | string;
  minWidth?: number | string;
  maxHeight?: number | string;
  minHeight?: number | string;
  /** 배경색 변경 가능 */
  bgColor?: string;
  /** 글자색 변경 가능 */
  color?: string;
}
export const commonStyle = ({
  width,
  height,
  maxWidth,
  minWidth,
  maxHeight,
  minHeight,
  bgColor,
  color,
}: CommonStyleProps) => css`
  ${width !== undefined && `width: ${addUnit(width)}`};
  ${height !== undefined && `height: ${addUnit(height)}`};

  ${maxWidth !== undefined && `max-width: ${addUnit(maxWidth)}`};
  ${maxHeight !== undefined && `max-height: ${addUnit(maxHeight)}`};

  ${minWidth !== undefined && `min-width: ${addUnit(minWidth)}`};
  ${minHeight !== undefined && `min-height: ${addUnit(minHeight)}`};

  ${bgColor && `background: ${bgColor}`};
  ${color && `color: ${color}`};
`;
