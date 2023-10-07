import { css } from 'styled-components';

import { RiChargingPile2Fill } from 'react-icons/ri';

import FlexBox from '@common/FlexBox';
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
    <ListItem divider NoLastDivider pb={3} css={foundStationListCss}>
      <FlexBox
        tag="button"
        type="button"
        width="100%"
        noRadius="all"
        background="transparent"
        columnGap={2}
        onMouseDown={() => handleShowStationDetails({ stationId, latitude, longitude })}
        nowrap
        css={iconCss}
      >
        <RiChargingPile2Fill size={16} fill="#585858" />
        <div>
          <Text weight="regular" align="left" title={stationName} lineClamp={1}>
            {stationName}
          </Text>
          <Text fontSize={1.3} align="left" lineClamp={1} color="#585858">
            {address === 'null' || !address ? '주소 미확인' : address}
          </Text>
        </div>
      </FlexBox>
    </ListItem>
  );
};

const iconCss = css`
  & > svg {
    margin-top: 0.4rem;
    flex-shrink: 0;
  }
`;

export default SearchedStationCard;
