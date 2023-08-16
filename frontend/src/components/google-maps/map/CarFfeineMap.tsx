import { useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import StationMarkersContainer from '@marker/StationMarkersContainer';

import { debounce } from '@utils/debounce';
import { useExternalValue } from '@utils/external-state';
import { setLocalStorage } from '@utils/storage';

import { getGoogleMapStore } from '@stores/google-maps/googleMapStore';
import { toastActions } from '@stores/layout/toastStore';
import { serverStationFilterAction } from '@stores/station-filters/serverStationFiltersStore';

import { useMemberFilters } from '@hooks/tanstack-query/station-filters/useMemberFilters';

import ToastContainer from '@common/Toast/ToastContainer';

import ClientStationFilters from '@ui/ClientStationFilters';
import MapController from '@ui/MapController';
import ModalContainer from '@ui/ModalContainer';
import ModalSecondaryContainer from '@ui/ModalSecondaryContainer';
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
      <ModalSecondaryContainer />
      <ToastContainer />
    </>
  );
};

const CarFfeineMapListener = () => {
  const googleMap = useExternalValue(getGoogleMapStore());
  const queryClient = useQueryClient();

  const debouncedIdleHandler = debounce(() => {
    console.log('idle (테스트용: 제거 예정)');
    if (googleMap.getZoom() < INITIAL_ZOOM_SIZE) {
      toastActions.showToast('지도를 조금만 더 확대해주세요', 'warning', 'bottom-center');
    }
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY_STATIONS] });

    setLocalStorage<google.maps.LatLngLiteral>(LOCAL_KEY_LAST_POSITION, {
      lat: googleMap.getCenter().lat(),
      lng: googleMap.getCenter().lng(),
    });
  }, 300);

  useEffect(() => {
    googleMap.addListener('idle', debouncedIdleHandler);

    const initMarkersEvent = googleMap.addListener('bounds_changed', async () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_STATIONS] });

      google.maps.event.removeListener(initMarkersEvent);
    });
  }, []);

  return <></>;
};

// TODO: 유저 필터링이 로그인 된 이후 바로 적용되지 않는 문제 다시 발생. 이 부분 어떻게 수정할지 고민해보기
const UserFilterListener = () => {
  const queryClient = useQueryClient();
  const { data: memberFilters } = useMemberFilters();
  const { setAllServerStationFilters } = serverStationFilterAction;

  if (memberFilters !== undefined) {
    setAllServerStationFilters(memberFilters);
    queryClient.invalidateQueries([{ queryKey: [QUERY_KEY_STATIONS] }]);
  }

  return <></>;
};

export default CarFfeineMap;
