import { useEffect } from 'react';

import type { Position } from '../../types';

interface Props {
  map: google.maps.Map;
  position: Position;
}

const UserMarker = ({ map, position }: Props) => {
  useEffect(() => {
    const newMarker = new google.maps.Marker({
      position: { lat: position.lat, lng: position.lng },
      map: map,
    });

    newMarker.addListener('click', () => console.log(`현재 위치: ${position.lat} ${position.lng}`));

    return () => {
      newMarker.setMap(null);
    };
  }, []);

  return <></>;
};

export default UserMarker;
