import { css } from '@emotion/react';

import { addUnit } from '@common/utils/addUnit';

export interface Spacing {
  /** 상하좌우 padding,
   * - [number] 숫자만 적을 경우 `0.4` 곱한 값으로 계산되며 rem 단위로 자동 변환
   * - [string] 단위까지 적어줘야 함 (ex. 0.8rem, 1rem 2rem)
   */
  p?: number | string;
  /** 좌우 padding,
   * - [number] 숫자만 적을 경우 `0.4` 곱한 값으로 계산되며 rem 단위로 자동 변환
   * - [string] 단위까지 적어줘야 함 (ex. 0.8rem, 1rem 2rem)
   */
  px?: number | string;
  /** 상하 padding,
   * - [number] 숫자만 적을 경우 `0.4` 곱한 값으로 계산되며 rem 단위로 자동 변환
   * - [string] 단위까지 적어줘야 함 (ex. 0.8rem, 1rem 2rem)
   */
  py?: number | string;
  /** 왼쪽에 padding,
   * - [number] 숫자만 적을 경우 `0.4` 곱한 값으로 계산되며 rem 단위로 자동 변환
   * - [string] 단위까지 적어줘야 함 (ex. 0.8rem, 1rem 2rem)
   */
  pl?: number | string;
  /** 오른쪽에 padding,
   * - [number] 숫자만 적을 경우 `0.4` 곱한 값으로 계산되며 rem 단위로 자동 변환
   * - [string] 단위까지 적어줘야 함 (ex. 0.8rem, 1rem 2rem)
   */
  pr?: number | string;
  /** 위에 padding,
   * - [number] 숫자만 적을 경우 `0.4` 곱한 값으로 계산되며 rem 단위로 자동 변환
   * - [string] 단위까지 적어줘야 함 (ex. 0.8rem, 1rem 2rem)
   */
  pt?: number | string;
  /** 아래에 padding,
   * - [number] 숫자만 적을 경우 `0.4` 곱한 값으로 계산되며 rem 단위로 자동 변환
   * - [string] 단위까지 적어줘야 함 (ex. 0.8rem, 1rem 2rem)
   */
  pb?: number | string;
  /** 상하좌우 margin,
   * - [number] 숫자만 적을 경우 `0.4` 곱한 값으로 계산되며 rem 단위로 자동 변환
   * - [string] 단위까지 적어줘야 함 (ex. 0.8rem, 1rem 2rem)
   */
  m?: number | string;
  /** 좌우 margin,
   * - [number] 숫자만 적을 경우 `0.4` 곱한 값으로 계산되며 rem 단위로 자동 변환
   * - [string] 단위까지 적어줘야 함 (ex. 0.8rem, 1rem 2rem)
   */
  mx?: number | string;
  /** 상하 margin,
   * - [number] 숫자만 적을 경우 `0.4` 곱한 값으로 계산되며 rem 단위로 자동 변환
   * - [string] 단위까지 적어줘야 함 (ex. 0.8rem, 1rem 2rem)
   */
  my?: number | string;
  /** 왼쪽에 margin,
   * - [number] 숫자만 적을 경우 `0.4` 곱한 값으로 계산되며 rem 단위로 자동 변환
   * - [string] 단위까지 적어줘야 함 (ex. 0.8rem, 1rem 2rem)
   */
  ml?: number | string;
  /** 오른쪽에 margin,
   * - [number] 숫자만 적을 경우 `0.4` 곱한 값으로 계산되며 rem 단위로 자동 변환
   * - [string] 단위까지 적어줘야 함 (ex. 0.8rem, 1rem 2rem)
   */
  mr?: number | string;
  /** 위에 margin,
   * - [number] 숫자만 적을 경우 `0.4` 곱한 값으로 계산되며 rem 단위로 자동 변환
   * - [string] 단위까지 적어줘야 함 (ex. 0.8rem, 1rem 2rem)
   */
  mt?: number | string;
  /** 아래에 margin,
   * - [number] 숫자만 적을 경우 `0.4` 곱한 값으로 계산되며 rem 단위로 자동 변환
   * - [string] 단위까지 적어줘야 함 (ex. 0.8rem, 1rem 2rem)
   */
  mb?: number | string;
}

export const spacingStyle = ({
  p,
  px,
  py,
  pl,
  pr,
  pt,
  pb,
  m,
  mx,
  my,
  ml,
  mr,
  mt,
  mb,
}: Spacing) => css`
  ${p !== undefined && `padding: ${addUnit(p)}`};
  ${px !== undefined && `padding-left: ${addUnit(px)}; padding-right: ${addUnit(px)}`};
  ${py !== undefined && `padding-top: ${addUnit(py)}; padding-bottom: ${addUnit(py)}`};

  ${pt !== undefined && `padding-top: ${addUnit(pt)}`};
  ${pr !== undefined && `padding-right: ${addUnit(pr)}`};
  ${pb !== undefined && `padding-bottom: ${addUnit(pb)}`};
  ${pl !== undefined && `padding-left: ${addUnit(pl)}`};

  ${m !== undefined && `margin: ${addUnit(m)}`};
  ${mx !== undefined && `margin-left: ${addUnit(mx)}; margin-right: ${addUnit(mx)}`};
  ${my !== undefined && `margin-top: ${addUnit(my)}; margin-bottom: ${addUnit(my)}`};

  ${mt !== undefined && `margin-top: ${addUnit(mt)}`};
  ${mr !== undefined && `margin-right: ${addUnit(mr)}`};
  ${mb !== undefined && `margin-bottom: ${addUnit(mb)}`};
  ${ml !== undefined && `margin-left: ${addUnit(ml)}`};
`;

// for Storybook
export const spacingArgTypes = {
  p: {
    control: {
      type: 'text',
    },
    description: `상하좌우 padding
    <br />**아래의 설명은 모든 spacing props에 해당**
    <br />- [string] 단위까지 적어줘야 함 (ex. 0.8rem, 1rem 2rem)
    <br />&nbsp; 🔷 스토리북에서는 string 🔷
    <br />- [number] 숫자만 적을 경우 '0.4' 곱한 값으로 계산되며 rem 단위로 자동 변환
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
