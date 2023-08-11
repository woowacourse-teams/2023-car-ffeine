import { useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import StationMarkersContainer from '@marker/StationMarkersContainer';

import { useExternalValue } from '@utils/external-state';
import { setLocalStorage } from '@utils/storage';

import { getGoogleMapStore } from '@stores/google-maps/googleMapStore';
import { toastActions } from '@stores/layout/toastStore';

import { useUserFilters } from '@hooks/tanstack-query/station-filters/useUserFilters';

import ToastContainer from '@common/Toast/ToastContainer';

import ClientStationFilters from '@ui/ClientStationFilters';
import MapController from '@ui/MapController';
import ModalContainer from '@ui/ModalContainer';
import NavigationBar from '@ui/NavigationBar';

import { INITIAL_ZOOM_SIZE } from '@constants/googleMaps';
import { QUERY_KEY_STATIONS } from '@constants/queryKeys';
import { LOCAL_KEY_LAST_POSITION } from '@constants/storageKeys';

const CarFfeineMap = () => {
  return (
    <>
      <CarFfeineMapListener />
      <UserFilterListener />
      <NavigationBar />
      <ClientStationFilters />
      <MapController />
      <StationMarkersContainer />
      <ModalContainer />
      <ToastContainer />
    </>
  );
};

const CarFfeineMapListener = () => {
  const googleMap = useExternalValue(getGoogleMapStore());
  const queryClient = useQueryClient();

  useEffect(() => {
    googleMap.addListener('idle', () => {
      console.log('idle (테스트용: 제거 예정)');

      if (googleMap.getZoom() < INITIAL_ZOOM_SIZE) {
        toastActions.showToast('지도를 조금만 더 확대해주세요', 'warning', 'bottom-center');
      }

      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_STATIONS] });
      setLocalStorage<google.maps.LatLngLiteral>(LOCAL_KEY_LAST_POSITION, {
        lat: googleMap.getCenter().lat(),
        lng: googleMap.getCenter().lng(),
      });
    });
  }, []);

  return <></>;
};

const UserFilterListener = () => {
  useUserFilters();

  return <></>;
};

export default CarFfeineMap;
