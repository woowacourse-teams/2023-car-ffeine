import { useEffect } from 'react';

import StationMarkersContainer from '@marker/StationMarkersContainer';

import { useExternalValue } from '@utils/external-state';
import { setLocalStorage } from '@utils/storage';

import { getGoogleMapStore } from '@stores/googleMapStore';

import { useUpdateStations } from '@hooks/useUpdateStations';

import ClientStationFilters from '@ui/ClientStationFilters';
import MapController from '@ui/MapController';
import ModalContainer from '@ui/ModalContainer';
import Navigator from '@ui/Navigator';

import { LOCAL_STORAGE_KEY_LAST_POSITION } from '@constants';

const CarFfeineMap = () => {
  return (
    <>
      <CarFfeineMapListener />
      <StationMarkersContainer />
      <Navigator />
      <ClientStationFilters />
      <ModalContainer />
      <MapController />
    </>
  );
};

const CarFfeineMapListener = () => {
  const { updateStations } = useUpdateStations();
  const googleMap = useExternalValue(getGoogleMapStore());

  useEffect(() => {
    googleMap.addListener('idle', () => {
      setLocalStorage<google.maps.LatLngLiteral>(LOCAL_STORAGE_KEY_LAST_POSITION, {
        lat: googleMap.getCenter().lat(),
        lng: googleMap.getCenter().lng(),
      });
    });

    googleMap.addListener('dragend', () => {
      console.log('dragend');
      updateStations();
    });

    googleMap.addListener('zoom_changed', () => {
      console.log('zoom_changed');
      updateStations();
    });

    const initMarkersEvent = googleMap.addListener('bounds_changed', () => {
      updateStations();
      google.maps.event.removeListener(initMarkersEvent);
    });
  }, []);

  return <></>;
};

export default CarFfeineMap;
