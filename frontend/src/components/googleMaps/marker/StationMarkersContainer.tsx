import StationMarker from './StationMarker';
import { useStations } from '../../../hooks/useStations';

interface Props {
  map: google.maps.Map;
}

const StationMarkersContainer = ({ map }: Props) => {
  const { ...queryInfo } = useStations(map);
  const stations = queryInfo.data;

  if (!stations || !queryInfo.isSuccess) {
    return <></>;
  }

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
