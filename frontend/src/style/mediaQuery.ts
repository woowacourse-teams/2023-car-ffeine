import { css } from 'styled-components';

import { MOBILE_BREAKPOINT } from '@constants';

export const displayNone = css`
  @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    display: none;
  }
`;
