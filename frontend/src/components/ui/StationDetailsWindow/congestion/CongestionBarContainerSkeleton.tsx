import { css } from 'styled-components';

import Box from '@common/Box';
import FlexBox from '@common/FlexBox';
import Skeleton from '@common/Skeleton';
import Text from '@common/Text';

const CongestionBarContainerSkeleton = () => {
  return (
    <FlexBox direction="column" gap={4}>
      <FlexBox direction="column">
        {Array.from({ length: 24 }, (_, index) => (
          <Box key={index} css={graphCss}>
            <Text variant="caption">{String(index + 1).padStart(2, '0')}</Text>
            <Skeleton borderRadius="4px 10px 10px 4px" width="92.5%" height="1.2rem" />
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

export default CongestionBarContainerSkeleton;
