import { useEffect, useRef } from 'react';

import StationMarkersContainer from '@marker/StationMarkersContainer';
import UserMarker from '@marker/UserMarker';

import { useExternalState } from '@utils/external-state';

import { googleMapStore } from '@stores/googleMapStore';

import { useCurrentPosition } from '@hooks/useCurrentPosition';
import { useUpdateStations } from '@hooks/useUpdateStations';

import MarkerList from '@ui/MarkerList';
import StationList from '@ui/StationList';
import ZoomController from '@ui/ZoomController';

import { INITIAL_ZOOM_SIZE } from '@constants';

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
          <StationList />
          <MarkerList />
          <ZoomController />
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
