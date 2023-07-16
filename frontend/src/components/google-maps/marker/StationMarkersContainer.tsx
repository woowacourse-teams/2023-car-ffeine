import { useStations } from '@hooks/useStations';

import StationMarker from './StationMarker';

interface Props {
  googleMap: google.maps.Map;
}

const StationMarkersContainer = ({ googleMap }: Props) => {
  const { data: stations, isSuccess } = useStations(googleMap);

  if (!stations || !isSuccess) {
    return <></>;
  }

  return (
    <>
      {stations.map((station) => {
        return <StationMarker key={station.stationId} googleMap={googleMap} station={station} />;
      })}
    </>
  );
};

export default StationMarkersContainer;
