import { useEffect } from 'react';

import type { Station } from '../../types';

interface Props {
  map: google.maps.Map;
  station: Station;
  onClick: () => void;
}

const StationMarker = ({ map, station, onClick }: Props) => {
  const { latitude, longitude, stationName } = station;

  useEffect(() => {
    const newMarker = new google.maps.Marker({
      position: { lat: latitude, lng: longitude },
      map: map,
      title: stationName,
    });

    newMarker.addListener('click', onClick);

    return () => {
      newMarker.setMap(null);
    };
  }, []);

  return <></>;
};

export default StationMarker;
