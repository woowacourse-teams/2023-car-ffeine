import { useEffect, useRef, useState } from 'react';

import { INITIAL_ZOOM_SIZE } from '../../constants';
import { useCurrentPosition } from '../../hooks/useCurrentPosition';
import UserMarker from '../marker/UserMarker';

const CarFfeineMap = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [googleMap, setGoogleMap] = useState<google.maps.Map>();
  
  const position = useCurrentPosition();

  const isClientReady = position !== undefined && googleMap !== undefined;

  useEffect(() => {
    if (position != undefined) {
      const initialMap = new window.google.maps.Map(ref.current, {
        center: position,
        zoom: INITIAL_ZOOM_SIZE,
        disableDefaultUI: true,
      });

      setGoogleMap(initialMap);
    }
  }, [position]);

  return (
    <>
      <div ref={ref} id="map" style={{ minHeight: '100vh' }} />
      {isClientReady && <UserMarker map={googleMap} position={position} />}
    </>
  );
};

export default CarFfeineMap;
