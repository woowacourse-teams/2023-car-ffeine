import Button from '@common/Button';
import ListItem from '@common/ListItem';
import Text from '@common/Text';

import { foundStationListCss } from '@ui/StationSearchWindow/SearchResult.style';

import type { SearchedStation, StationPosition } from '@type';

export interface SearchedStationCardProps {
  station: SearchedStation;
  handleShowStationDetails: (props: StationPosition) => void;
}

const SearchedStationCard = ({ station, handleShowStationDetails }: SearchedStationCardProps) => {
  const { stationId, stationName, address, latitude, longitude } = station;

  return (
    <ListItem divider NoLastDivider key={stationId} pt={2} pb={3} css={foundStationListCss}>
      <Button
        width="100%"
        noRadius="all"
        background="transparent"
        onMouseDown={() => handleShowStationDetails({ stationId, latitude, longitude })}
      >
        <Text variant="h6" align="left" title={stationName} lineClamp={1}>
          {stationName}
        </Text>
        <Text variant="label" align="left" lineClamp={1} color="#585858">
          {address || '주소 미확인'}
        </Text>
      </Button>
    </ListItem>
  );
};

export default SearchedStationCard;
