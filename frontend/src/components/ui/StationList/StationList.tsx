import { css } from 'styled-components';

import { useStations } from '@hooks/useStations';

import List from '@common/List';
import Text from '@common/Text';

import StationSummaryCard from './StationSummaryCard';

const StationList = () => {
  const { data: stations, isSuccess } = useStations();

  // TODO: 주변 충전소 목록 스켈레톤 적용하기
  if (stations === undefined) {
    return (
      <List css={[searchResultList, tempAlign]}>
        <Text variant="h1">⌛</Text>
      </List>
    );
  }

  return (
    isSuccess && (
      <List css={searchResultList}>
        {stations.map((station) => {
          return <StationSummaryCard key={station.stationId} station={station} />;
        })}
      </List>
    )
  );
};

const tempAlign = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const searchResultList = css`
  position: fixed;
  left: 7rem;
  bottom: 0;
  width: 34rem;
  height: calc(100vh - 16rem);
  border-top: 1.8rem solid var(--lighter-color);
  border-bottom: 4rem solid var(--lighter-color);
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  background: var(--lighter-color);
  overflow: auto;
`;

export default StationList;
