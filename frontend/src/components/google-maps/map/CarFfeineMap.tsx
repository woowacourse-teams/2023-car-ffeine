import { useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import StationMarkersContainer from '@marker/StationMarkersContainer';

import { debounce } from '@utils/debounce';
import { useExternalValue, useSetExternalState } from '@utils/external-state';
import { getDisplayPosition, type DisplayPosition } from '@utils/google-maps';
import { getSessionStorage, setLocalStorage } from '@utils/storage';

import { getGoogleMapStore } from '@stores/google-maps/googleMapStore';
import { warningModalActions } from '@stores/layout/warningModalStore';
import { popupMenuOpenStore } from '@stores/popupMenuOpenStore';
import { serverStationFilterAction } from '@stores/station-filters/serverStationFiltersStore';

import { useCarFilters } from '@hooks/tanstack-query/station-filters/useCarFilters';
import { useMemberFilters } from '@hooks/tanstack-query/station-filters/useMemberFilters';

import ToastContainer from '@common/Toast/ToastContainer';
import ZoomWarningModal from '@common/WarningModal';

import ClientStationFilters from '@ui/ClientStationFilters';
import MapController from '@ui/MapController';
import ModalContainer from '@ui/ModalContainer';
import Navigator from '@ui/Navigator';
import WarningModalContainer from '@ui/WarningModalContainer';

import { INITIAL_ZOOM_SIZE } from '@constants/googleMaps';
import { QUERY_KEY_STATION_MARKERS } from '@constants/queryKeys';
import { LOCAL_KEY_LAST_POSITION, SESSION_KEY_LAST_REQUEST_POSITION } from '@constants/storageKeys';

const CarFfeineMap = () => {
  return (
    <>
      <CarFfeineMapListener />
      <UserFilterListener />

      <ToastContainer />
      <ModalContainer />

      <Navigator />
      <ClientStationFilters />
      <MapController />

      <WarningModalContainer />
      <StationMarkersContainer />
    </>
  );
};

const getBounds = (displayPosition: DisplayPosition) => {
  return {
    northEast: {
      latitude: displayPosition.latitude + displayPosition.latitudeDelta,
      longitude: displayPosition.longitude + displayPosition.longitudeDelta,
    },
    southWest: {
      latitude: displayPosition.latitude - displayPosition.latitudeDelta,
      longitude: displayPosition.longitude - displayPosition.longitudeDelta,
    },
  };
};

const isCachedRegion = (displayPosition: DisplayPosition) => {
  const cachedDisplayPosition = getSessionStorage<DisplayPosition | null>(
    SESSION_KEY_LAST_REQUEST_POSITION,
    null
  );
  if (cachedDisplayPosition === null) {
    return false;
  }
  const cachedBounds = getBounds(cachedDisplayPosition);
  const bounds = getBounds(displayPosition);
  if (cachedBounds.northEast.latitude < bounds.northEast.latitude) {
    return false;
  }
  if (cachedBounds.northEast.longitude < bounds.northEast.longitude) {
    return false;
  }
  if (cachedBounds.southWest.latitude > bounds.southWest.latitude) {
    return false;
  }
  if (cachedBounds.southWest.longitude > bounds.southWest.longitude) {
    return false;
  }
  return true;
};

const CarFfeineMapListener = () => {
  const googleMap = useExternalValue(getGoogleMapStore());
  const queryClient = useQueryClient();
  const setIsPopupMenuOpen = useSetExternalState(popupMenuOpenStore);

  const debouncedIdleHandler = debounce(() => {
    if (googleMap.getZoom() < INITIAL_ZOOM_SIZE) {
      warningModalActions.openModal(<ZoomWarningModal />);
    } else {
      warningModalActions.closeModal();
    }
    const displayPosition = getDisplayPosition(googleMap);
    if (!isCachedRegion(displayPosition)) {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_STATION_MARKERS] });
    }

    setIsPopupMenuOpen(false);

    setLocalStorage<google.maps.LatLngLiteral>(LOCAL_KEY_LAST_POSITION, {
      lat: googleMap.getCenter().lat(),
      lng: googleMap.getCenter().lng(),
    });
  }, 300);

  useEffect(() => {
    googleMap.addListener('idle', debouncedIdleHandler);

    const initMarkersEvent = googleMap.addListener('bounds_changed', async () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_STATION_MARKERS] });

      google.maps.event.removeListener(initMarkersEvent);
    });
  }, []);

  return <></>;
};

const UserFilterListener = () => {
  const queryClient = useQueryClient();
  const { data: memberFilters } = useMemberFilters();
  const { data: carFilters } = useCarFilters();
  const { setAllServerStationFilters } = serverStationFilterAction;

  if (memberFilters !== undefined) {
    setAllServerStationFilters(memberFilters);
    setAllServerStationFilters(carFilters);
    queryClient.invalidateQueries([{ queryKey: [QUERY_KEY_STATION_MARKERS] }]);
  }

  return <></>;
};

export default CarFfeineMap;
