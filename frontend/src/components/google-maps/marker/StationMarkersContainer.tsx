import { useStations } from '@hooks/tanstack-query/station-markers/useStations';

import Marker from './Marker';

const StationMarkersContainer = () => {
  const { data: stations, isSuccess } = useStations();

  if (!stations || !isSuccess) {
    return <></>;
  }

  return (
    <>
      {stations.map((station) => {
        return <Marker key={station.stationId} station={station} />;
      })}
    </>
  );
};

export default StationMarkersContainer;
