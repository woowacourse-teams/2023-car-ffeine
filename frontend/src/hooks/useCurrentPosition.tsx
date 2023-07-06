import { useEffect, useState } from 'react';

import { INITIAL_CENTER } from '../constants';
import type { Position } from '../types';

export const useCurrentPosition = () => {
  const [position, setPosition] = useState<Position>();

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
        setPosition(INITIAL_CENTER);
      },
      {
        enableHighAccuracy: true,
      }
    );
  }, []);

  return position;
};
