import { css } from 'styled-components';

import Box from '@common/Box';
import FlexBox from '@common/FlexBox';
import Skeleton from '@common/Skeleton';

import ChargerCardSkeleton from '@ui/StationDetailsWindow/ChargerCardSkeleton';
import StationInformationSkeleton from '@ui/StationDetailsWindow/StationInformationSkeleton';

const StationDetailsViewSkeleton = () => {
  return (
    <Box px={2} py={10} css={containerCss}>
      <StationInformationSkeleton />
      <Box my={3}>
        <FlexBox justifyContent="center">
          <Skeleton width="90%" height="3rem" />
        </FlexBox>
      </Box>
      <FlexBox>
        {Array(10)
          .fill(undefined)
          .map((v, i) => (
            <ChargerCardSkeleton key={i} />
          ))}
      </FlexBox>
    </Box>
  );
};

const containerCss = css`
  width: 34rem;
  height: 100vh;
  background-color: white;
  box-shadow: 1px 1px 2px gray;
  border-left: 0.5px solid #e1e4eb;
  border-right: 0.5px solid #e1e4eb;
  overflow: scroll;
`;

export default StationDetailsViewSkeleton;
