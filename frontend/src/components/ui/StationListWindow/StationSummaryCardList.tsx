import type { InfiniteData } from '@tanstack/react-query';

import type { StationSummary } from '@type';

import StationSummaryCard from './StationSummaryCard';
import type { StationSummaryResponse } from './hooks/useInfiniteStationSummaries';

export interface StationSummaryCardListProps {
  cachedStationSummaries: StationSummary[];
  data: InfiniteData<StationSummaryResponse>;
}

const StationSummaryCardList = ({ cachedStationSummaries, data }: StationSummaryCardListProps) => {
  return (
    <>
      {cachedStationSummaries.map((stationSummary) => (
        <StationSummaryCard key={stationSummary.stationId} station={stationSummary} />
      ))}
      {data.pages.map((page) => (
        <div key={JSON.stringify(page.stations.map((station) => station.stationId))}>
          {page.stations.map((stationSummary) => (
            <StationSummaryCard key={stationSummary.stationId} station={stationSummary} />
          ))}
        </div>
      ))}
    </>
  );
};

export default StationSummaryCardList;
