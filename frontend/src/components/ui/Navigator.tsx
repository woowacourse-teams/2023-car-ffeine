import { css } from 'styled-components';

import FlexBox from '@common/FlexBox';

const fixedPositionCss = css`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
`;

const Navigator = () => {
  return (
    <FlexBox width={7} height={'100vh'} background={'white'} css={fixedPositionCss} noRadius="all">
      아이콘
    </FlexBox>
  );
};

export default Navigator;
