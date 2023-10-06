import { useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { useExternalValue, useSetExternalState } from '@utils/external-state';
import { getDisplayPosition } from '@utils/google-maps';
import { isCachedRegion } from '@utils/google-maps/isCachedRegion';
import { setLocalStorage } from '@utils/storage';

import { deltaAreaActions, deltaAreaStore } from '@stores/google-maps/deltaAreaStore';
import { getGoogleMapStore } from '@stores/google-maps/googleMapStore';
import { profileMenuOpenStore } from '@stores/profileMenuOpenStore';

import { QUERY_KEY_STATION_MARKERS } from '@constants/queryKeys';
import { LOCAL_KEY_LAST_POSITION } from '@constants/storageKeys';

const CarFfeineMapListener = () => {
  const googleMap = useExternalValue(getGoogleMapStore());
  const queryClient = useQueryClient();
  const setIsProfileMenuOpen = useSetExternalState(profileMenuOpenStore);
  const deltaAreaState = useExternalValue(deltaAreaStore);

  const requestStationMarkers = () => {
    const displayPosition = getDisplayPosition(googleMap);
    if (!isCachedRegion(displayPosition)) {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_STATION_MARKERS] });
    }

    setIsProfileMenuOpen(false);

    setLocalStorage<google.maps.LatLngLiteral>(LOCAL_KEY_LAST_POSITION, {
      lat: googleMap.getCenter().lat(),
      lng: googleMap.getCenter().lng(),
    });
  };

  useEffect(() => {
    googleMap.addListener('idle', () => {
      if (deltaAreaState === 'medium' || deltaAreaState === 'small') {
        requestStationMarkers();
      }

      const { latitudeDelta, longitudeDelta } = getDisplayPosition(googleMap);

      deltaAreaActions.setDeltaAreaState(latitudeDelta * longitudeDelta);
    });

    const initMarkersEvent = googleMap.addListener('bounds_changed', async () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_STATION_MARKERS] });

      google.maps.event.removeListener(initMarkersEvent);
    });
  }, []);

  return <></>;
};

export default CarFfeineMapListener;
