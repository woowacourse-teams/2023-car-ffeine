import { useEffect, useState } from 'react';
import type { Root } from 'react-dom/client';
import { createRoot } from 'react-dom/client';

import StationMarker from './StationMarker';
import { useStations } from '../../../hooks/useStations';

interface Props {
  googleMap: google.maps.Map;
}

const StationMarkersContainer = ({ googleMap }: Props) => {
  const { ...queryInfo } = useStations(googleMap);
  const stations = queryInfo.data;

  const [briefStationInfoRoot, setBriefStationInfoRoot] = useState<Root>();
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow>();

  useEffect(() => {
    const container = document.createElement('div');
    const newRoot = createRoot(container);
    setBriefStationInfoRoot(newRoot);

    const initialInfoWindow = new google.maps.InfoWindow({
      content: container,
    });
    setInfoWindow(initialInfoWindow);
  }, []);

  if (!stations || !queryInfo.isSuccess) {
    return <></>;
  }

  return (
    <>
      {stations.map((station) => (
        <StationMarker
          key={station.stationId}
          googleMap={googleMap}
          station={station}
          briefStationInfoRoot={briefStationInfoRoot}
          infoWindow={infoWindow}
        />
      ))}
    </>
  );
};

export default StationMarkersContainer;
