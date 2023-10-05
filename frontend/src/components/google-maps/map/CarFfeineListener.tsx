import { useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { useRenderStationMarker } from '@marker/HighZoomMarkerContainer/hooks/useRenderStationMarker';

import { debounce } from '@utils/debounce';
import { useExternalValue, useSetExternalState } from '@utils/external-state';
import { getDisplayPosition } from '@utils/google-maps';
import { isCachedRegion } from '@utils/google-maps/isCachedRegion';
import { setLocalStorage } from '@utils/storage';

import { getGoogleMapStore } from '@stores/google-maps/googleMapStore';
import { markerInstanceStore } from '@stores/google-maps/markerInstanceStore';
import { zoomActions, zoomStore } from '@stores/google-maps/zoomStore';
import { warningModalActions } from '@stores/layout/warningModalStore';
import { profileMenuOpenStore } from '@stores/profileMenuOpenStore';

import ZoomWarningModal from '@ui/WarningModal';

import { QUERY_KEY_STATION_MARKERS } from '@constants/queryKeys';
import { LOCAL_KEY_LAST_POSITION } from '@constants/storageKeys';

const CarFfeineMapListener = () => {
  const googleMap = useExternalValue(getGoogleMapStore());
  const queryClient = useQueryClient();
  const setIsProfileMenuOpen = useSetExternalState(profileMenuOpenStore);
  const { removeAllMarkers } = useRenderStationMarker();
  const zoom = useExternalValue(zoomStore);

  const debouncedHighZoomHandler = debounce(() => {
    const displayPosition = getDisplayPosition(googleMap);
    if (!isCachedRegion(displayPosition)) {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_STATION_MARKERS] });
    }

    setIsProfileMenuOpen(false);

    setLocalStorage<google.maps.LatLngLiteral>(LOCAL_KEY_LAST_POSITION, {
      lat: googleMap.getCenter().lat(),
      lng: googleMap.getCenter().lng(),
    });
  }, 300);

  useEffect(() => {
    googleMap.addListener('idle', () => {
      if (zoom.state === 'high') {
        debouncedHighZoomHandler();
      }

      zoomActions.setZoom(googleMap.getZoom());
    });

    const initMarkersEvent = googleMap.addListener('bounds_changed', async () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_STATION_MARKERS] });

      google.maps.event.removeListener(initMarkersEvent);
    });
  }, []);

  /**
   * zoom.state가 바뀌었을 때만 1번 실행된다.
   */
  useEffect(() => {
    removeAllMarkers(markerInstanceStore.getState());
    queryClient.setQueryData([QUERY_KEY_STATION_MARKERS], () => []);

    if (zoom.state === 'middle') {
      warningModalActions.openModal(<ZoomWarningModal />);
    } else {
      warningModalActions.closeModal();
    }
  }, [zoom.state]);

  return <></>;
};

export default CarFfeineMapListener;
