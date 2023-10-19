import FlexBox from '@common/FlexBox';
import Loader from '@common/Loader';
import Text from '@common/Text';

import {
  borderCss,
  containerCss,
  overFlowCss,
} from '@ui/ServerStationFilters/ServerStationFilters';

import { getColor } from '@style';

const ServerStationFiltersSkeleton = () => {
  return (
    <FlexBox
      height={'100vh'}
      justifyContent="center"
      alignItems={'center'}
      direction={'column'}
      background={'white'}
      css={[overFlowCss, borderCss, containerCss]}
      nowrap={true}
      noRadius={'all'}
      px={6}
    >
      <Text tag="h2" variant="h6" mb={6} weight="regular">
        필터링을 불러오고 있습니다
      </Text>
      <Loader border={4} css={{ width: '60px', height: '60px', borderBottomColor: getColor() }} />
      {/* <FlexBox
        width={32}
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
      <FilterOptionSkeleton /> */}
    </FlexBox>
  );
};

export default ServerStationFiltersSkeleton;
