import { useEffect } from 'react';

import type { googleMap } from '../../../types';

interface Props extends googleMap {
  position: google.maps.LatLngLiteral;
}

const UserMarker = ({ googleMap, position }: Props) => {
  const { lat, lng } = position;

  useEffect(() => {
    const newMarker = new google.maps.Marker({
      position: { lat, lng },
      map: googleMap,
    });

    newMarker.addListener('click', () => console.log(`현재 위치: ${lat} ${lng}`));

    return () => {
      newMarker.setMap(null);
    };
  }, []);

  return <></>;
};

export default UserMarker;
