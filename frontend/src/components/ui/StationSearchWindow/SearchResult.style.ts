import { css } from 'styled-components';

import { MOBILE_BREAKPOINT } from '@constants';

export const searchResultListCss = css`
  position: absolute;
  z-index: 9999;
  width: 29.6rem;
  max-height: 46rem;
  overflow: auto;
  border: 1.5px solid #d9d9da;
  border-radius: 10px;
  background: #fcfcfc;
  box-shadow: 0 3px 10px 0 #d9d9da;
  font-size: 1.5rem;
  line-height: 2;

  @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    width: calc(100vw - 3.2rem);

    max-height: 22.8rem;
  }
`;

export const foundStationListCss = css`
  display: flex;

  &:hover {
    background: #f5f5f5;
  }
`;
