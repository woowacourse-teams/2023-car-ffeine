import { useEffect } from 'react';

import StationMarkersContainer from '@marker/StationMarkersContainer';

import { useExternalValue } from '@utils/external-state';

import { googleMapStore } from '@stores/googleMapStore';

import { useUpdateStations } from '@hooks/useUpdateStations';

import MarkerList from '@ui/MarkerList';
import StationList from '@ui/StationList';
import ZoomController from '@ui/ZoomController';

const CarFfeineMap = () => {
  return (
    <>
      <CarFfeineMapListener />
      <StationMarkersContainer />
      <StationList />
      <MarkerList />
      <ZoomController />
    </>
  );
};

const CarFfeineMapListener = () => {
  const { updateStations } = useUpdateStations();
  const googleMap = useExternalValue(googleMapStore());

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
