import { useEffect, useRef } from 'react';

import { INITIAL_ZOOM_SIZE } from '../constants';
import { useCurrentPosition } from '../hooks/useCurrentPosition';

const GoogleMap = () => {
  const ref = useRef<HTMLDivElement>(null);
  const position = useCurrentPosition();

  useEffect(() => {
    if (position != undefined) {
      new window.google.maps.Map(ref.current, {
        center: position,
        zoom: INITIAL_ZOOM_SIZE,
        disableDefaultUI: true,
      });
    }
  }, [position]);

  return <div ref={ref} id="map" style={{ minHeight: '100vh' }} />;
};

export default GoogleMap;
