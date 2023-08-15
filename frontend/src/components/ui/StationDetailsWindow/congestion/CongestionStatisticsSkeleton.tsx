import { css } from 'styled-components';

import Box from '@common/Box';
import FlexBox from '@common/FlexBox';
import Skeleton from '@common/Skeleton';
import Text from '@common/Text';

const CongestionStatisticsSkeleton = () => {
  return (
    <FlexBox direction="column" gap={4}>
      <Skeleton width="16rem" height="2.6rem" mb={1} />
      <Box mb={2}>
        <FlexBox justifyContent="center">
          {Array.from({ length: 7 }, (_, index) => (
            <Skeleton key={index} width="3.8rem" height="3.8rem" borderRadius="50%" />
          ))}
        </FlexBox>
      </Box>
      <FlexBox direction="column">
        {Array.from({ length: 24 }, (_, index) => (
          <Box key={index} css={graphCss}>
            <Text variant="caption">{index}</Text>
            <Skeleton width="90%" height="1.2rem" />
          </Box>
        ))}
      </FlexBox>
      <FlexBox nowrap>
        <Skeleton width="100%" height="2.8rem" />
        <Skeleton width="100%" height="2.8rem" />
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
