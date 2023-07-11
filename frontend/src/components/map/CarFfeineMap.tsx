import { useEffect, useRef, useState } from 'react';

import { INITIAL_ZOOM_SIZE } from '../../constants';
import { useCurrentPosition } from '../../hooks/useCurrentPosition';
import UserMarker from '../marker/UserMarker';
import StationMarkersContainer from '../marker/StationMarkersContainer';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchStation } from '../../hooks/useStations';

interface Props {
  map: google.maps.Map;
}

const CarFfeinMapListener = ({ map }: Props) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(['stations'], {
    mutationFn: fetchStation,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['stations'] });
    },
  });

  useEffect(() => {
    map.addListener('dragend', () => {
      console.log('dragend');
      mutate(map);
    });

    map.addListener('zoom_changed', () => {
      console.log('zoom_changed');
      mutate(map);
    });

    const initMarkersEvent = map.addListener('bounds_changed', () => {
      mutate(map);
      google.maps.event.removeListener(initMarkersEvent);
    });
  }, []);

  return <></>;
};

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
      {isClientReady && (
        <>
          <CarFfeinMapListener map={googleMap} />
          <StationMarkersContainer map={googleMap} />
          <UserMarker map={googleMap} position={position} />
        </>
      )}
    </>
  );
};

export default CarFfeineMap;
