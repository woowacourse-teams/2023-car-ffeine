import { css } from 'styled-components';

import type { ReactElement } from 'react';

import FlexBox from '@common/FlexBox';

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
`;

export default BasePanel;
