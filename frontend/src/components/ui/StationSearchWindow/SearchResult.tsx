import { css } from 'styled-components';

import { useEffect } from 'react';

import Button from '@common/Button';
import List from '@common/List';
import ListItem from '@common/ListItem';
import Text from '@common/Text';

import Error from '@ui/Error';

import { MOBILE_BREAKPOINT } from '@constants';

import type { SearchedStation, StationPosition } from '@type/stations';

export interface SearchResultProps {
  stations: SearchedStation[];
  isLoading: boolean;
  isError: boolean;
  showStationDetails: (param: StationPosition) => void;
  closeResult: () => void;
}

const SearchResult = (props: SearchResultProps) => {
  const { stations, isLoading, isError, showStationDetails, closeResult } = props;

  const handleShowStationDetails = (handlerProps: StationPosition) => {
    const { stationId, latitude, longitude } = handlerProps;

    showStationDetails({ stationId, latitude, longitude });
  };

  useEffect(() => {
    document.body.addEventListener('click', closeResult);

    return () => {
      document.body.removeEventListener('click', closeResult);
    };
  }, []);

  if (isLoading) return <></>;

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
    <List aria-live="assertive" mt={1} css={searchResultList}>
      {stations.length ? (
        stations.map(({ stationId, stationName, address, latitude, longitude }) => (
          <ListItem divider noLastDivider key={stationId} pt={2} pb={3} css={foundStationList}>
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
        ))
      ) : (
        <>
          <ListItem mt={3} css={noSearchResult} pb={0}>
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

export const searchResultList = css`
  position: absolute;
  z-index: 9999;
  width: 29.6rem;
  max-height: 46rem;
  overflow: auto;
  border: 1.5px solid #d9d9da;
  border-radius: 10px;
  background: #fcfcfc;
  box-shadow: 0 3px 10px 0 #d9d9da;
  font-size: 1.5rem;
  line-height: 2;

  @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    width: calc(100vw - 2rem);

    max-height: 22.6rem;
  }
`;

export const foundStationList = css`
  &:hover {
    background: #f5f5f5;
  }
`;

export const noSearchResult = css`
  font-size: 1.8rem;
  font-weight: 600;
`;

export default SearchResult;
