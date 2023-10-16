import { css } from 'styled-components';

import { addUnit } from '../utils/addUnit';

export interface SpacingProps {
  /** 상하좌우 padding,
   * - [number] 숫자만 적을 경우 rem 단위로 자동 변환
   * - [string] 단위까지 적어줘야 함 (ex. 0.8rem, 1rem 2rem)
   */
  p?: number | string;
  /** 좌우 padding,
   * - [number] 숫자만 적을 경우 rem 단위로 자동 변환
   * - [string] 단위까지 적어줘야 함 (ex. 0.8rem, 1rem 2rem)
   */
  px?: number | string;
  /** 상하 padding,
   * - [number] 숫자만 적을 경우 rem 단위로 자동 변환
   * - [string] 단위까지 적어줘야 함 (ex. 0.8rem, 1rem 2rem)
   */
  py?: number | string;
  /** 왼쪽에 padding,
   * - [number] 숫자만 적을 경우 rem 단위로 자동 변환
   * - [string] 단위까지 적어줘야 함 (ex. 0.8rem, 1rem 2rem)
   */
  pl?: number | string;
  /** 오른쪽에 padding,
   * - [number] 숫자만 적을 경우 rem 단위로 자동 변환
   * - [string] 단위까지 적어줘야 함 (ex. 0.8rem, 1rem 2rem)
   */
  pr?: number | string;
  /** 위에 padding,
   * - [number] 숫자만 적을 경우 rem 단위로 자동 변환
   * - [string] 단위까지 적어줘야 함 (ex. 0.8rem, 1rem 2rem)
   */
  pt?: number | string;
  /** 아래에 padding,
   * - [number] 숫자만 적을 경우 rem 단위로 자동 변환
   * - [string] 단위까지 적어줘야 함 (ex. 0.8rem, 1rem 2rem)
   */
  pb?: number | string;
  /** 상하좌우 margin,
   * - [number] 숫자만 적을 경우 rem 단위로 자동 변환
   * - [string] 단위까지 적어줘야 함 (ex. 0.8rem, 1rem 2rem)
   */
  m?: number | string;
  /** 좌우 margin,
   * - [number] 숫자만 적을 경우 rem 단위로 자동 변환
   * - [string] 단위까지 적어줘야 함 (ex. 0.8rem, 1rem 2rem)
   */
  mx?: number | string;
  /** 상하 margin,
   * - [number] 숫자만 적을 경우 rem 단위로 자동 변환
   * - [string] 단위까지 적어줘야 함 (ex. 0.8rem, 1rem 2rem)
   */
  my?: number | string;
  /** 왼쪽에 margin,
   * - [number] 숫자만 적을 경우 rem 단위로 자동 변환
   * - [string] 단위까지 적어줘야 함 (ex. 0.8rem, 1rem 2rem)
   */
  ml?: number | string;
  /** 오른쪽에 margin,
   * - [number] 숫자만 적을 경우 rem 단위로 자동 변환
   * - [string] 단위까지 적어줘야 함 (ex. 0.8rem, 1rem 2rem)
   */
  mr?: number | string;
  /** 위에 margin,
   * - [number] 숫자만 적을 경우 rem 단위로 자동 변환
   * - [string] 단위까지 적어줘야 함 (ex. 0.8rem, 1rem 2rem)
   */
  mt?: number | string;
  /** 아래에 margin,
   * - [number] 숫자만 적을 경우 rem 단위로 자동 변환
   * - [string] 단위까지 적어줘야 함 (ex. 0.8rem, 1rem 2rem)
   */
  mb?: number | string;
}

const SPACING_UNIT = 4;

export const spacing = css<SpacingProps>`
  ${({ p }) => p !== undefined && `padding: ${addUnit(p, SPACING_UNIT)}`};
  ${({ px }) =>
    px !== undefined &&
    `padding-left: ${addUnit(px, SPACING_UNIT)}; padding-right: ${addUnit(px, SPACING_UNIT)}`};
  ${({ py }) =>
    py !== undefined &&
    `padding-top: ${addUnit(py, SPACING_UNIT)}; padding-bottom: ${addUnit(py, SPACING_UNIT)}`};

  ${({ pt }) => pt !== undefined && `padding-top: ${addUnit(pt, SPACING_UNIT)}`};
  ${({ pr }) => pr !== undefined && `padding-right: ${addUnit(pr, SPACING_UNIT)}`};
  ${({ pb }) => pb !== undefined && `padding-bottom: ${addUnit(pb, SPACING_UNIT)}`};
  ${({ pl }) => pl !== undefined && `padding-left: ${addUnit(pl, SPACING_UNIT)}`};

  ${({ m }) => m !== undefined && `margin: ${addUnit(m, SPACING_UNIT)}`};
  ${({ mx }) =>
    mx !== undefined &&
    `margin-left: ${addUnit(mx, SPACING_UNIT)}; margin-right: ${addUnit(mx, SPACING_UNIT)}`};
  ${({ my }) =>
    my !== undefined &&
    `margin-top: ${addUnit(my, SPACING_UNIT)}; margin-bottom: ${addUnit(my, SPACING_UNIT)}`};

  ${({ mt }) => mt !== undefined && `margin-top: ${addUnit(mt, SPACING_UNIT)}`};
  ${({ mr }) => mr !== undefined && `margin-right: ${addUnit(mr, SPACING_UNIT)}`};
  ${({ mb }) => mb !== undefined && `margin-bottom: ${addUnit(mb, SPACING_UNIT)}`};
  ${({ ml }) => ml !== undefined && `margin-left: ${addUnit(ml, SPACING_UNIT)}`};
`;

// for Storybook
export const spacingArgTypes = {
  p: {
    control: {
      type: 'text',
    },
    description: `상하좌우 padding
    <br />**아래의 설명은 모든 spacing props에 해당**
    <br />- [string] 단위까지 적어줘야 함 (ex. 8px, 10px 20px)
    <br />&nbsp; 🔷 스토리북에서는 string 🔷
    <br />- [number] 숫자만 적을 경우 px로 자동 변환
    `,
  },
  py: {
    control: {
      type: 'text',
    },
    description: `상하 padding`,
  },
  px: {
    control: {
      type: 'text',
    },
    description: `좌우 padding`,
  },
  pt: {
    control: {
      type: 'text',
    },
    description: `위에 padding`,
  },
  pr: {
    control: {
      type: 'text',
    },
    description: `오른쪽에 padding`,
  },
  pb: {
    control: {
      type: 'text',
    },
    description: `아래에 padding`,
  },
  pl: {
    control: {
      type: 'text',
    },
    description: `왼쪽에 padding`,
  },

  m: {
    control: {
      type: 'text',
    },
    description: `상하좌우 margin`,
  },
  my: {
    control: {
      type: 'text',
    },
    description: `상하 margin`,
  },
  mx: {
    control: {
      type: 'text',
    },
    description: `좌우 margin`,
  },
  mt: {
    control: {
      type: 'text',
    },
    description: `위에 margin`,
  },
  mr: {
    control: {
      type: 'text',
    },
    description: `오른쪽에 margin`,
  },
  mb: {
    control: {
      type: 'text',
    },
    description: `아래에 margin`,
  },
  ml: {
    control: {
      type: 'text',
    },
    description: `왼쪽에 margin`,
  },
} as const;
