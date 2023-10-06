import { useEffect } from 'react';

import Button from '@common/Button';
import List from '@common/List';
import ListItem from '@common/ListItem';
import Text from '@common/Text';

import Error from '@ui/Error';

import type { SearchedRegion, SearchedStation, StationPosition } from '@type/stations';

import { foundStationListCss, noSearchResultCss, searchResultListCss } from './SearchResult.style';

export interface SearchResultProps {
  regions: SearchedRegion[];
  stations: SearchedStation[];
  isLoading: boolean;
  isError: boolean;
  showStationDetails: (param: StationPosition) => void;
  closeResult: () => void;
}

const SearchResult = ({
  regions,
  stations,
  isLoading,
  isError,
  showStationDetails,
  closeResult,
}: SearchResultProps) => {
  const handleShowStationDetails = ({ stationId, latitude, longitude }: StationPosition) => {
    showStationDetails({ stationId, latitude, longitude });
  };

  useEffect(() => {
    document.body.addEventListener('click', closeResult);

    return () => {
      document.body.removeEventListener('click', closeResult);
    };
  }, []);

  if (isLoading) {
    return <></>;
  }

  if (isError)
    return (
      <Error
        title="문제가 발생했어요!"
        message="예상하지 못한 오류로"
        subMessage="검색 결과를 가져오지 못했습니다."
        fontSize="40%"
      />
    );

  return (
    <List aria-live="assertive" mt={1} css={searchResultListCss}>
      {stations.length ? (
        <>
          <>
            {stations.map(({ stationId, stationName, address, latitude, longitude }) => (
              <ListItem
                divider
                NoLastDivider
                key={stationId}
                pt={2}
                pb={3}
                css={foundStationListCss}
              >
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
            ))}
          </>
        </>
      ) : (
        <>
          <ListItem mt={3} css={noSearchResultCss} pb={0}>
            검색 결과가 없습니다.
          </ListItem>
          <ListItem mt={1} mb={5}>
            <Text variant="subtitle">검색어를 다시 한 번 확인해 주세요.</Text>
            <Text tag="span" css={{ display: 'block' }}>
              ·&nbsp; 오타는 없나요?
            </Text>
            <Text tag="span">·&nbsp; 띄어쓰기가 잘못되진 않았나요?</Text>
          </ListItem>
        </>
      )}
    </List>
  );
};

export default SearchResult;
