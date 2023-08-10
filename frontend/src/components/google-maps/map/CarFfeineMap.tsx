import { useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import StationMarkersContainer from '@marker/StationMarkersContainer';

import { useExternalValue } from '@utils/external-state';
import { getSessionStorage, setLocalStorage } from '@utils/storage';

import { getGoogleMapStore } from '@stores/google-maps/googleMapStore';
import { toastActions } from '@stores/layout/toastStore';

import { useUserFilters } from '@hooks/tanstack-query/station-filters/useUserFilters';
import { useUpdateStations } from '@hooks/tanstack-query/station-markers/useUpdateStations';

import ToastContainer from '@common/Toast/ToastContainer';

import ClientStationFilters from '@ui/ClientStationFilters';
import MapController from '@ui/MapController';
import ModalContainer from '@ui/ModalContainer';
import NavigationBar from '@ui/NavigationBar';

import { LOCAL_KEY_LAST_POSITION, SESSION_KEY_USER_TOKEN } from '@constants/storageKeys';

const CarFfeineMap = () => {
  // 이 부분 리뷰 부탁드립니다
  useUserFilters();

  useEffect(() => {
    const userToken = getSessionStorage(SESSION_KEY_USER_TOKEN, '');

    if (userToken !== '') {
      toastActions.showToast('로그인 되었습니다!');
    }
  }, []);

  return (
    <>
      <CarFfeineMapListener />
      <StationMarkersContainer />
      <NavigationBar />
      <ClientStationFilters />
      <ModalContainer />
      <MapController />
      <ToastContainer />
    </>
  );
};

const CarFfeineMapListener = () => {
  const { updateStations } = useUpdateStations();
  const googleMap = useExternalValue(getGoogleMapStore());

  const queryClient = useQueryClient();

  useEffect(() => {
    googleMap.addListener('idle', () => {
      console.log('idle');
      queryClient.invalidateQueries({ queryKey: ['stations'] });
      setLocalStorage<google.maps.LatLngLiteral>(LOCAL_KEY_LAST_POSITION, {
        lat: googleMap.getCenter().lat(),
        lng: googleMap.getCenter().lng(),
      });
    });

    const initMarkersEvent = googleMap.addListener('bounds_changed', async () => {
      updateStations();

      google.maps.event.removeListener(initMarkersEvent);
    });
  }, []);

  return <></>;
};

export default CarFfeineMap;
