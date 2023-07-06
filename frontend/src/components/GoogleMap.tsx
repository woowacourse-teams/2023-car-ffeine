import { useEffect, useRef } from 'react';

import { INITIAL_CENTER, INITIAL_ZOOM_SIZE } from '../constants';

const GoogleMap = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initialMap = new window.google.maps.Map(ref.current, {
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM_SIZE,
      disableDefaultUI: true,
    });
  }, []);

  return <div ref={ref} id="map" style={{ minHeight: '100vh' }} />;
};

export default GoogleMap;
