import { Box } from 'car-ffeine-design-system';
import { css } from 'styled-components';

import type { ReactElement } from 'react';

import { MOBILE_BREAKPOINT } from '@constants';

interface Props {
  component: ReactElement | null;
}

const BasePanel = ({ component }: Props) => {
  return <Box css={containerCss}>{component !== null && component}</Box>;
};

const containerCss = css`
  margin-left: 7rem;

  @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    margin-left: 0;
    position: absolute;
    z-index: 99;
  }
`;

export default BasePanel;
