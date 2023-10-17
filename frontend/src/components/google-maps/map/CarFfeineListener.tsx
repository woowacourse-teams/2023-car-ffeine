import { useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { useExternalValue, useSetExternalState } from '@utils/external-state';
import { getDisplayPosition } from '@utils/google-maps';
import { isCachedRegion } from '@utils/google-maps/isCachedRegion';
import { getLocalStorage, setLocalStorage } from '@utils/storage';

import { deltaAreaActions, deltaAreaStore } from '@stores/google-maps/deltaAreaStore';
import { getGoogleMapStore } from '@stores/google-maps/googleMapStore';
import { profileMenuOpenStore } from '@stores/profileMenuOpenStore';

import { DEFAULT_CENTER, INITIAL_ZOOM_LEVEL } from '@constants/googleMaps';
import { QUERY_KEY_CLUSTER_MARKERS, QUERY_KEY_STATION_MARKERS } from '@constants/queryKeys';
import { LOCAL_KEY_LAST_POSITION } from '@constants/storageKeys';

import type { DisplayPosition } from '@type';

/**
 * 모든 idle 상태에 따라 변화해야 하는 지도의 중심 좌표는 googleMapStore에서 가져오고,
 * 특정 상태에 따라 변경되어야 하는 지도의 줌 레벨은 외부에서 받아온다.
 * 이 함수를 이용해 지도의 중심 좌표와 외부에서 받아온 줌 레벨을 로컬스토리지에 저장한다.
 *
 * @param zoom 현재 지도 영역의 줌 레벨을 로컬 스토리지에 저장한다.
 */
const setDisplayPositionInLocalStorage = (zoom: number) => {
  const googleMapCenter = getGoogleMapStore().getState().getCenter();

  setLocalStorage<google.maps.LatLngLiteral & Pick<DisplayPosition, 'zoom'>>(
    LOCAL_KEY_LAST_POSITION,
    {
      lat: googleMapCenter.lat(),
      lng: googleMapCenter.lng(),
      zoom: zoom,
    }
  );
};

const CarFfeineMapListener = () => {
  const googleMap = useExternalValue(getGoogleMapStore());
  const queryClient = useQueryClient();
  const setIsProfileMenuOpen = useSetExternalState(profileMenuOpenStore);

  const requestStationMarkers = () => {
    const displayPosition = getDisplayPosition(googleMap);

    if (!isCachedRegion(displayPosition)) {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_STATION_MARKERS] });
    }

    setIsProfileMenuOpen(false);
    setDisplayPositionInLocalStorage(googleMap.getZoom());
  };

  const requestClusterMarkers = () => {
    const displayPosition = getDisplayPosition(googleMap);
    const prevDisplayPosition = getLocalStorage<
      google.maps.LatLngLiteral & Pick<DisplayPosition, 'zoom'>
    >(LOCAL_KEY_LAST_POSITION, { ...DEFAULT_CENTER, zoom: INITIAL_ZOOM_LEVEL });

    setIsProfileMenuOpen(false);

    // 현재 사용자의 디바이스에 보여지는 지도 영역이 캐시된 영역 밖으로 나가지 않으면 서버 클러스터링 마커 재요청을 발생시키지 않는다.
    if (!isCachedRegion(displayPosition)) {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_CLUSTER_MARKERS] });

      setDisplayPositionInLocalStorage(googleMap.getZoom());
      return;
    }

    // 현재 사용자의 디바이스에 보여지는 지도 영역이 캐시된 영역 내에 있어도 줌 레벨이 이전보다 1이상 커졌을 시 서버 클러스터링 마커 재요청을 발생 시킨다.
    if (Math.abs(googleMap.getZoom() - prevDisplayPosition.zoom) >= 1) {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_CLUSTER_MARKERS] });

      setDisplayPositionInLocalStorage(googleMap.getZoom());
      return;
    }

    setDisplayPositionInLocalStorage(prevDisplayPosition.zoom);
  };

  useEffect(() => {
    googleMap.addListener('idle', () => {
      if (deltaAreaStore.getState() === 'medium' || deltaAreaStore.getState() === 'small') {
        requestStationMarkers();
      }

      if (deltaAreaStore.getState() === 'large') {
        requestClusterMarkers();
      }

      const { latitudeDelta, longitudeDelta } = getDisplayPosition(googleMap);

      deltaAreaActions.setDeltaAreaState(latitudeDelta * longitudeDelta);
    });
  }, []);

  return <></>;
};

export default CarFfeineMapListener;
