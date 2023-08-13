import Box from '@common/Box';
import FlexBox from '@common/FlexBox';
import Skeleton from '@common/Skeleton';

import { stationDetailsViewContainerCss } from '@ui/StationDetailsWindow/StationDetailsView';
import ChargerCardSkeleton from '@ui/StationDetailsWindow/chargers/ChargerCardSkeleton';
import StationInformationSkeleton from '@ui/StationDetailsWindow/station/StationInformationSkeleton';

const StationDetailsViewSkeleton = () => {
  return (
    <Box px={2} py={10} css={stationDetailsViewContainerCss}>
      <StationInformationSkeleton />
      <FlexBox justifyContent="center" my={3}>
        <Skeleton width="90%" height="3rem" />
      </FlexBox>
      <FlexBox>
        {Array.from({ length: 10 }, (_, index) => (
          <ChargerCardSkeleton key={index} />
        ))}
      </FlexBox>
    </Box>
  );
};

export default StationDetailsViewSkeleton;
