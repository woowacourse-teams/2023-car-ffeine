import { css } from 'styled-components';

import { MOBILE_BREAKPOINT } from '@constants';

export const displayNoneInMobile = css`
  @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    display: none;
  }
`;

export const displayNoneInWeb = css`
  @media screen and (min-width: ${MOBILE_BREAKPOINT}px) {
    display: none;
  }
`;
