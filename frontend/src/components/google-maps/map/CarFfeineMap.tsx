import { useEffect } from 'react';

import StationMarkersContainer from '@marker/StationMarkersContainer';

import { useExternalValue } from '@utils/external-state';

import { getGoogleMapStore } from '@stores/googleMapStore';

import { useUpdateStations } from '@hooks/useUpdateStations';

import MapController from '@ui/MapController';
import MarkerList from '@ui/MarkerList';
import StationList from '@ui/StationList';

const CarFfeineMap = () => {
  return (
    <>
      <CarFfeineMapListener />
      <StationMarkersContainer />
      <StationList />
      <MarkerList />
      <MapController />
    </>
  );
};

const CarFfeineMapListener = () => {
  const { updateStations } = useUpdateStations();
  const googleMap = useExternalValue(getGoogleMapStore());

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
