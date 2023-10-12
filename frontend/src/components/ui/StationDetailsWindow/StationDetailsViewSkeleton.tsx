import Box from '@common/Box';
import FlexBox from '@common/FlexBox';
import Skeleton from '@common/Skeleton';

import { stationDetailsViewContainerCss } from '@ui/StationDetailsWindow/StationDetailsView';
import ChargerCardSkeleton from '@ui/StationDetailsWindow/chargers/ChargerCardSkeleton';
import StationInformationSkeleton from '@ui/StationDetailsWindow/station/StationInformationSkeleton';

import { NAVIGATOR_PANEL_WIDTH } from '@constants';

const StationDetailsViewSkeleton = () => {
  return (
    <Box
      px={5}
      pt={6}
      width={NAVIGATOR_PANEL_WIDTH}
      height="100vh"
      bgColor="#fff"
      border="x"
      borderWidth="0.5px"
      borderColor="#e1e4eb"
      css={stationDetailsViewContainerCss}
    >
      <StationInformationSkeleton />
      <FlexBox justifyContent="center" my={3}>
        <Skeleton height="3rem" />
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
