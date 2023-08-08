import { css } from 'styled-components';

import Box from '@common/Box';
import FlexBox from '@common/FlexBox';
import Skeleton from '@common/Skeleton';
import Text from '@common/Text';

const CongestionStatisticsSkeleton = () => {
  return (
    <FlexBox direction="column" gap={4}>
      <FlexBox nowrap>
        <Skeleton width="100%" height="2.8rem" />
        <Skeleton width="100%" height="2.8rem" />
      </FlexBox>
      <Box mb={4}>
        <FlexBox justifyContent="center">
          {Array.from({ length: 7 }, (_, index) => (
            <Skeleton key={index} width="4.2rem" height="4.2rem" borderRadius="50%" />
          ))}
        </FlexBox>
      </Box>
      <FlexBox direction="column">
        {Array.from({ length: 24 }, (_, index) => (
          <Box key={index} css={graphCss}>
            <Text variant="caption">{index}</Text>
            <Skeleton width="90%" />
          </Box>
        ))}
      </FlexBox>
    </FlexBox>
  );
};

const graphCss = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default CongestionStatisticsSkeleton;
