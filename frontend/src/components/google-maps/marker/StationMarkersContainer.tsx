import { useUserFilters } from '@hooks/tanstack-query/station-filters/useUserFilters';
import { useStations } from '@hooks/tanstack-query/station-markers/useStations';

import StationMarker from './StationMarker';

const StationMarkersContainer = () => {
  const { isLoading } = useUserFilters();
  const { data: stations, isSuccess } = useStations();

  if (!stations || !isSuccess || isLoading) {
    return <></>;
  }

  return (
    <>
      {stations.map((station) => {
        return <StationMarker key={station.stationId} station={station} />;
      })}
    </>
  );
};

export default StationMarkersContainer;
