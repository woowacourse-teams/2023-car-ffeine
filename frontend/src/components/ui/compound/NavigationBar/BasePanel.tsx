import { css } from 'styled-components';

import type { ReactElement } from 'react';

import FlexBox from '@common/FlexBox';

import { MOBILE_BREAKPOINT } from '@constants';

interface Props {
  component: ReactElement | null;
}

const BasePanel = ({ component }: Props) => {
  return (
    <FlexBox width="fit-content" css={containerCss}>
      {component !== null && component}
    </FlexBox>
  );
};

const containerCss = css`
  position: relative;
  margin-left: 7rem;

  @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    margin-left: 0;
    position: absolute;
  }
`;

export default BasePanel;
