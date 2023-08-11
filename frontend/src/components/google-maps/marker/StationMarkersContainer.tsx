import { useStations } from '@hooks/tanstack-query/station-markers/useStations';

import StationMarker from './StationMarker';

const StationMarkersContainer = () => {
  const { data: stations, isSuccess } = useStations();

  if (!stations || !isSuccess) {
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
