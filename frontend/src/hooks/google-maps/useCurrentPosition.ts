import { useState } from 'react';

export const useCurrentPosition = () => {
  const [position, setPosition] = useState<google.maps.LatLngLiteral>(undefined);

  const getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        alert('위치 권한을 허용해주세요.');
        setPosition(undefined);
      },
      {
        enableHighAccuracy: true,
      }
    );
  };

  return { position, getCurrentPosition };
};
