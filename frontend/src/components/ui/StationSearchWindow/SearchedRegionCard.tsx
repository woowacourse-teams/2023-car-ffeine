import Button from '@common/Button';
import ListItem from '@common/ListItem';
import Text from '@common/Text';

import { foundStationListCss } from '@ui/StationSearchWindow/SearchResult.style';

import type { SearchedRegion } from '@type';

export interface SearchedRegionCardProps {
  region: SearchedRegion;
}

const SearchedRegionCard = ({ region }: SearchedRegionCardProps) => {
  const { regionName, latitude, longitude } = region;

  return (
    <ListItem divider NoLastDivider pt={2} pb={3} css={foundStationListCss}>
      <Button
        width="100%"
        noRadius="all"
        background="transparent"
        onMouseDown={() => alert(`${regionName}(으)로 이동합니다. ${latitude}, ${longitude}`)}
      >
        <Text variant="h6" align="left" title={regionName} lineClamp={1}>
          {regionName}
        </Text>
      </Button>
    </ListItem>
  );
};

export default SearchedRegionCard;
