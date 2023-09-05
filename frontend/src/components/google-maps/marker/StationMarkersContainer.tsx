import { useStationMarkers } from '@hooks/tanstack-query/station-markers/useStationMarkers';

import Marker from './Marker';

const StationMarkersContainer = () => {
  const { data: stationMarkers, isSuccess } = useStationMarkers();

  if (!stationMarkers || !isSuccess) {
    return <></>;
  }

  return (
    <>
      {stationMarkers.map((stationMarker) => {
        return <Marker key={stationMarker.stationId} stationMarker={stationMarker} />;
      })}
    </>
  );
};

export default StationMarkersContainer;
