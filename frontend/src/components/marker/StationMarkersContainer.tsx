import type { Station } from '../../types';
import StationMarker from './StationMarker';

interface Props {
  map: google.maps.Map;
  stations: Station[];
}

const StationMarkersContainer = ({ map, stations }: Props) => {
  return (
    <>
      {stations.map((station) => (
        <StationMarker
          key={station.stationId}
          map={map}
          station={station}
          onClick={() => console.log(station)}
        />
      ))}
    </>
  );
};

export default StationMarkersContainer;
