import { css } from 'styled-components';

import { addUnit } from './utils/addUnit';

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

export const spacing = css<SpacingProps>`
  ${({ p }) => p !== undefined && `padding: ${addUnit(p, 0.4)}`};
  ${({ px }) =>
    px !== undefined && `padding-left: ${addUnit(px, 0.4)}; padding-right: ${addUnit(px, 0.4)}`};
  ${({ py }) =>
    py !== undefined && `padding-top: ${addUnit(py, 0.4)}; padding-bottom: ${addUnit(py, 0.4)}`};

  ${({ pt }) => pt !== undefined && `padding-top: ${addUnit(pt, 0.4)}`};
  ${({ pr }) => pr !== undefined && `padding-right: ${addUnit(pr, 0.4)}`};
  ${({ pb }) => pb !== undefined && `padding-bottom: ${addUnit(pb, 0.4)}`};
  ${({ pl }) => pl !== undefined && `padding-left: ${addUnit(pl, 0.4)}`};

  ${({ m }) => m !== undefined && `margin: ${addUnit(m, 0.4)}`};
  ${({ mx }) =>
    mx !== undefined && `margin-left: ${addUnit(mx, 0.4)}; margin-right: ${addUnit(mx, 0.4)}`};
  ${({ my }) =>
    my !== undefined && `margin-top: ${addUnit(my, 0.4)}; margin-bottom: ${addUnit(my, 0.4)}`};

  ${({ mt }) => mt !== undefined && `margin-top: ${addUnit(mt, 0.4)}`};
  ${({ mr }) => mr !== undefined && `margin-right: ${addUnit(mr, 0.4)}`};
  ${({ mb }) => mb !== undefined && `margin-bottom: ${addUnit(mb, 0.4)}`};
  ${({ ml }) => ml !== undefined && `margin-left: ${addUnit(ml, 0.4)}`};
`;
