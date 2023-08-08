import Box from '@common/Box';
import FlexBox from '@common/FlexBox';
import Skeleton from '@common/Skeleton';

import ChargerCardSkeleton from '@ui/StationDetailsWindow/ChargerCardSkeleton';
import { stationDetailsViewContainerCss } from '@ui/StationDetailsWindow/StationDetailsView';
import StationInformationSkeleton from '@ui/StationDetailsWindow/StationInformationSkeleton';

const StationDetailsViewSkeleton = () => {
  return (
    <Box px={2} py={10} css={stationDetailsViewContainerCss}>
      <StationInformationSkeleton />
      <Box my={3}>
        <FlexBox justifyContent="center">
          <Skeleton width="90%" height="3rem" />
        </FlexBox>
      </Box>
      <FlexBox>
        {Array.from({ length: 10 }, (_, index) => (
          <ChargerCardSkeleton key={index} />
        ))}
      </FlexBox>
    </Box>
  );
};

export default StationDetailsViewSkeleton;
