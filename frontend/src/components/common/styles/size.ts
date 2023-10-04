import { css } from '@emotion/react';

import { getTypedObjectEntries } from '@utils/getTypedObjectEntries';

import { addUnit } from '@common/utils/addUnit';

import { CONTAINER_WIDTH, type CustomSize } from '../Container/style/container.style';

export interface Size {
  width?: number | string;
  height?: number | string;
  maxWidth?: CustomSize;
  minWidth?: CustomSize;
}

export const sizeStyle = ({ width, height, maxWidth, minWidth }: Size) => css`
  ${width !== undefined && `width: ${addUnit(width)}`};
  ${height !== undefined && `height: ${addUnit(height)}`};

  ${maxWidth && `max-width: ${CONTAINER_WIDTH[maxWidth]}`};
  ${minWidth && `min-width: ${CONTAINER_WIDTH[minWidth]}`};
`;

// for Storybook
export const sizeArgTypes = {
  width: {
    control: {
      type: 'text',
    },
    description: `너비 변경 가능
    <br />아래의 설명은 모든 size props에 해당
    <br />- [string] 단위까지 적어줘야 함 (ex. 8rem, 2rem)
    <br />  🔷 스토리북에서는 string 🔷
    <br />- [number] 숫자만 적을 경우 rem로 자동 변환
    `,
  },
  height: {
    control: {
      type: 'text',
    },
    description: '높이 변경 가능',
  },
  maxWidth: {
    options: Object.assign(
      { none: false },
      ...getTypedObjectEntries(CONTAINER_WIDTH).map(([key, value]) => ({
        [`${key} (${value})`]: key,
      }))
    ),
    control: {
      type: 'select',
    },
    description: '최대 너비 변경 가능',
  },
  minWidth: {
    options: Object.assign(
      { none: false },
      ...getTypedObjectEntries(CONTAINER_WIDTH).map(([key, value]) => ({
        [`${key} (${value})`]: key,
      }))
    ),
    description: '최소 너비 변경 가능',
  },
} as const;
