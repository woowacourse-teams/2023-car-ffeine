import FlexBox from '@common/FlexBox';
import Skeleton from '@common/Skeleton';

import FilterOptionSkeleton from '@ui/ServerStationFilters/FilterOptionSkeleton';
import {
  borderCss,
  filterHeaderCss,
  overFlowCss,
} from '@ui/ServerStationFilters/ServerStationFilters';

const ServerStationFiltersSkeleton = () => {
  return (
    <FlexBox
      width={34}
      height={'100vh'}
      alignItems={'center'}
      direction={'column'}
      background={'white'}
      css={[overFlowCss, borderCss]}
      nowrap={true}
      noRadius={'all'}
    >
      <FlexBox
        width={34}
        height={8}
        justifyContent="between"
        alignItems="center"
        css={filterHeaderCss}
      >
        <Skeleton width="7rem" height="4rem" />
        <Skeleton width="7rem" height="4rem" />
        <Skeleton width="7rem" height="4rem" />
      </FlexBox>
      <FilterOptionSkeleton />
      <FilterOptionSkeleton />
      <FilterOptionSkeleton />
    </FlexBox>
  );
};

export default ServerStationFiltersSkeleton;
