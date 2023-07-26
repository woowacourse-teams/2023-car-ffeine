import { useStations } from '@hooks/useStations';

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
