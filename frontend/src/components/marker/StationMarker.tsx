import { useEffect } from 'react';

import type { Station } from '../../types';

interface Props {
  map: google.maps.Map;
  station: Station;
  onClick: () => void;
}

const StationMarker = ({ map, station, onClick }: Props) => {
  const { lat, lng, title } = station;

  useEffect(() => {
    const newMarker = new google.maps.Marker({
      position: { lat, lng },
      map: map,
      title: title,
    });

    newMarker.addListener('click', onClick);

    return () => {
      newMarker.setMap(null);
    };
  }, []);

  return <></>;
};

export default StationMarker;
