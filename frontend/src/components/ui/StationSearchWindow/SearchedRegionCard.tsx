import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import Button from '@common/Button';
import FlexBox from '@common/FlexBox';
import ListItem from '@common/ListItem';
import Text from '@common/Text';

import type { SearchedRegion } from '@type';

export interface SearchedRegionCardProps {
  region: SearchedRegion;
}

const SearchedRegionCard = ({ region }: SearchedRegionCardProps) => {
  const { regionName, latitude, longitude } = region;

  return (
    <ListItem divider>
      <FlexBox alignItems="center">
        <Button
          width="100%"
          noRadius="all"
          background="transparent"
          onMouseDown={() => alert(`${regionName}(으)로 이동합니다. ${latitude}, ${longitude}`)}
        >
          <FlexBox justifyContent="between" alignItems="center">
            <FlexBox alignItems="center">
              <MagnifyingGlassIcon width="1.6rem" stroke="#767676" />
              <Text title={regionName}>{regionName}</Text>
            </FlexBox>
            <Text variant="caption" color="#585858">
              이동하기
            </Text>
          </FlexBox>
        </Button>
      </FlexBox>
    </ListItem>
  );
};

export default SearchedRegionCard;
