import { useEffect, useState } from 'react';

import { DEFAULT_CENTER } from '@constants';

export const useCurrentPosition = () => {
  const [position, setPosition] = useState<google.maps.LatLngLiteral>();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        // 현재 위치를 불러올 수 없는 경우 기본 위치로 이동
        setPosition(DEFAULT_CENTER);
      },
      {
        enableHighAccuracy: true,
      }
    );
  }, []);

  return position;
};
