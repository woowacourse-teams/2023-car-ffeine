import { Fragment } from 'react';

import type { InfiniteData } from '@tanstack/react-query';

import StationSummaryCard from './StationSummaryCard';
import type { StationSummaryResponse } from './hooks/useInfiniteStationSummaries';

export interface StationSummaryCardListProps {
  data: InfiniteData<StationSummaryResponse>;
}

const StationSummaryCardList = ({ data }: StationSummaryCardListProps) => {
  return (
    <>
      {data.pages.map((page) => (
        <Fragment key={page.nextPage}>
          {page.stations.map((stationSummary) => (
            <StationSummaryCard key={stationSummary.stationId} station={stationSummary} />
          ))}
        </Fragment>
      ))}
    </>
  );
};

export default StationSummaryCardList;
