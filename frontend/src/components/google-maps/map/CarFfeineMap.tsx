import { useEffect, useRef } from 'react';

import { INITIAL_ZOOM_SIZE } from '../../../constants';
import { useCurrentPosition } from '../../../hooks/useCurrentPosition';
import UserMarker from '../marker/UserMarker';
import StationMarkersContainer from '../marker/StationMarkersContainer';
import { useUpdateStations } from '../../../hooks/useUpdateStations';
import { useExternalState } from '../../../utils/external-state';
import { googleMapStore } from '../../../stores/googleMapStore';

interface Props {
  googleMap: google.maps.Map;
}

const CarFfeineMap = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [googleMap, setGoogleMap] = useExternalState<google.maps.Map>(googleMapStore);

  const position = useCurrentPosition();

  const isClientReady = position !== undefined && googleMap;

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
      {isClientReady && (
        <>
          <CarFfeineMapListener googleMap={googleMap} />
          <StationMarkersContainer googleMap={googleMap} />
          <UserMarker googleMap={googleMap} position={position} />
        </>
      )}
    </>
  );
};

const CarFfeineMapListener = ({ googleMap }: Props) => {
  const { updateStations } = useUpdateStations();

  useEffect(() => {
    googleMap.addListener('dragend', () => {
      console.log('dragend');
      updateStations(googleMap);
    });

    googleMap.addListener('zoom_changed', () => {
      console.log('zoom_changed');
      updateStations(googleMap);
    });

    const initMarkersEvent = googleMap.addListener('bounds_changed', () => {
      updateStations(googleMap);
      google.maps.event.removeListener(initMarkersEvent);
    });
  }, []);

  return <></>;
};

export default CarFfeineMap;
