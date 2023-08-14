import { css } from 'styled-components';

import Box from '@common/Box';
import Button from '@common/Button';
import FlexBox from '@common/FlexBox';
import ListItem from '@common/ListItem';
import Skeleton from '@common/Skeleton';

const StationSummaryCardSkeleton = () => {
  return (
    <ListItem>
      <Button width="100%" shadow css={foundStationButton}>
        <FlexBox alignItems="start" justifyContent="between" nowrap columnGap={2.8}>
          <Box>
            <Skeleton width="7rem" height="1.2rem" mb={2} />
            <Skeleton width="15rem" height="2.2rem" mb={3} />
            <Skeleton width="10rem" height="1.6rem" mb={2} />
            <Skeleton width="17rem" height="1.5rem" mb={3} />
            <FlexBox columnGap={3}>
              <Skeleton width="8rem" height="2.2rem" />
              <Skeleton width="8rem" height="2.2rem" />
            </FlexBox>
          </Box>
          <Skeleton width="3.2rem" height="3.2rem" borderRadius="1rem" />
        </FlexBox>
      </Button>
    </ListItem>
  );
};

const foundStationButton = css`
  padding: 1.4rem 1.2rem 2rem;
  box-shadow: 0 0.3rem 0.8rem 0 var(--gray-200-color);
  border-radius: 1.2rem;
`;

export default StationSummaryCardSkeleton;
