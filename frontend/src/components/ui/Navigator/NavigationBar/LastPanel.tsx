import { css } from 'styled-components';

import type { ReactElement } from 'react';

import FlexBox from '@common/FlexBox';

interface Props {
  component: ReactElement | null;
}

const LastPanel = ({ component }: Props) => {
  return (
    <FlexBox width="fit-content" css={containerCss}>
      {component !== null && <>{component}</>}
    </FlexBox>
  );
};

const containerCss = css`
  position: relative;
`;

export default LastPanel;
