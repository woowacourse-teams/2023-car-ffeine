import { css } from 'styled-components';

import type { SetStateCallbackType } from '@utils/external-state/StateManager';

import Button from '@common/Button';
import List from '@common/List';
import ListItem from '@common/ListItem';
import Text from '@common/Text';

import type { SearchedStation, StationPosition } from 'types';

export interface SearchResultProps {
  stations: SearchedStation[];
  isLoading: boolean;
  isError: boolean;
  setSelectedStationId: (param: number | SetStateCallbackType<number>) => void;
  showStationDetails: (param: StationPosition) => void;
}

const SearchResult = (props: SearchResultProps) => {
  const { stations, isLoading, isError, setSelectedStationId, showStationDetails } = props;

  const handleShowStationDetails = (handlerProps: StationPosition) => {
    const { stationId, latitude, longitude } = handlerProps;

    setSelectedStationId(stationId);
    showStationDetails({ stationId, latitude, longitude });
  };

  if (isLoading || isError) return <></>;

  return stations.length ? (
    <List css={searchResultList}>
      {stations.map(({ stationId, stationName, address, latitude, longitude }) => (
        <ListItem divider NoLastDivider key={stationId} css={foundStationList}>
          <Button
            width="100%"
            noRadius="all"
            onMouseDown={() => handleShowStationDetails({ stationId, latitude, longitude })}
          >
            <Text variant="h6" align="left" title={stationName} lineClamp={1}>
              {stationName}
            </Text>
            <Text variant="label" align="left" lineClamp={1} color="#585858">
              {address || '위도 경도로 주소를 알아내자'}
            </Text>
          </Button>
        </ListItem>
      ))}
    </List>
  ) : (
    <List role="dialog" aria-live="assertive" css={searchResultList}>
      <ListItem css={noSearchResult}>검색 결과가 없습니다.</ListItem>
      <ListItem>검색어를 다시 한 번 확인해 주세요.</ListItem>
    </List>
  );
};

export const searchResultList = css`
  position: absolute;
  z-index: 9999;
  width: 29.6rem;
  max-height: 46rem;
  margin-top: 2rem;
  overflow: auto;
  border: 1.5px solid #d9d9da;
  border-radius: 10px;
  background: #fcfcfc;
  box-shadow: 0 3px 10px 0 #d9d9da;
  font-size: 1.5rem;
`;

export const foundStationList = css`
  padding: 0.8rem 1.2rem;
`;

export const noSearchResult = css`
  margin-top: 1.2rem;
  font-size: 1.8rem;
  font-weight: 600;

  & + li {
    margin: 0.4rem 0 1.6rem;
  }
`;

export default SearchResult;
