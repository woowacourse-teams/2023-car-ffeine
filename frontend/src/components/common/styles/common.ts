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

// for Storybook
export const sizeArgTypes = {
  width: {
    control: {
      type: 'text',
    },
    description: `너비 변경 가능
    <br />아래의 설명은 모든 size props에 해당
    <br />- [string] 단위까지 적어줘야 함 (ex. 8px, 10px 20px)
    <br />  🔷 스토리북에서는 string 🔷
    <br />- [number] 숫자만 적을 경우 px로 자동 변환
    `,
  },
  height: {
    control: {
      type: 'text',
    },
    description: '높이 변경 가능',
  },
  maxWidth: {
    control: {
      type: 'text',
    },
    description: '최대 너비 변경 가능',
  },
  minWidth: {
    control: {
      type: 'text',
    },
    description: '최소 너비 변경 가능',
  },
} as const;
