import { useQuery } from '@tanstack/react-query';

import { useExternalValue } from '@utils/external-state';
import { getStoreSnapshot } from '@utils/external-state/tools';
import { getTypedObjectFromEntries } from '@utils/getTypedObjectFromEntries';
import { getTypedObjectKeys } from '@utils/getTypedObjectKeys';
import { getDisplayPosition } from '@utils/google-maps';
import { getQueryFormattedUrl } from '@utils/request-query-params';
import { setSessionStorage } from '@utils/storage';

import { serverUrlStore } from '@stores/config/serverUrlStore';
import { getGoogleMapStore } from '@stores/google-maps/googleMapStore';
import { clientStationFiltersStore } from '@stores/station-filters/clientStationFiltersStore';
import {
  selectedCapacitiesFilterStore,
  selectedCompaniesFilterStore,
  selectedConnectorTypesFilterStore,
} from '@stores/station-filters/serverStationFiltersStore';

import { DELIMITER } from '@constants';
import { COMPANIES } from '@constants/chargers';
import { INITIAL_ZOOM_SIZE } from '@constants/googleMaps';
import { QUERY_KEY_STATION_MARKERS } from '@constants/queryKeys';
import { SESSION_KEY_LAST_REQUEST_POSITION } from '@constants/storageKeys';

import type { DisplayPosition } from '@type';
import type { StationMarker } from '@type/stations';

const isMapLoaded = (displayPosition: DisplayPosition) => {
  const { latitudeDelta, longitudeDelta } = displayPosition;

  return !(latitudeDelta === 0 && longitudeDelta === 0);
};

export const fetchStationMarkers = async () => {
  const googleMap = getStoreSnapshot(getGoogleMapStore());
  const displayPosition = getDisplayPosition(googleMap);

  if (!isMapLoaded(displayPosition)) {
    throw new Error('지도가 로드되지 않았습니다');
  }

  const requestPositionParams: DisplayPosition = {
    ...displayPosition,
    latitudeDelta: displayPosition.latitudeDelta * 2,
    longitudeDelta: displayPosition.longitudeDelta * 2,
  };

  if (requestPositionParams.zoom < INITIAL_ZOOM_SIZE) {
    setSessionStorage<DisplayPosition>(SESSION_KEY_LAST_REQUEST_POSITION, null);

    return new Promise<StationMarker[]>((resolve) => resolve([]));
  }

  const displayPositionKeys = getTypedObjectKeys<DisplayPosition>(requestPositionParams);
  const displayPositionValues = Object.values(requestPositionParams).map(String);

  const displayPositionString = getTypedObjectFromEntries(
    displayPositionKeys,
    displayPositionValues
  );

  const companyFilters = selectedCompaniesFilterStore.getState();
  const capacityFilters = selectedCapacitiesFilterStore.getState();
  const connectorTypeFilters = selectedConnectorTypesFilterStore.getState();

  const requestQueryParams = getQueryFormattedUrl({
    ...displayPositionString,
    companyNames:
      companyFilters.size > 0
        ? [...companyFilters].map((companyKey) => COMPANIES[companyKey]).join(DELIMITER)
        : '',
    capacities: capacityFilters.size > 0 ? [...capacityFilters].join(DELIMITER) : '',
    chargerTypes: connectorTypeFilters.size > 0 ? [...connectorTypeFilters].join(DELIMITER) : '',
  });

  const serverUrl = serverUrlStore.getState();
  const stationMarkers = await fetch(`${serverUrl}/stations?${requestQueryParams}`, {
    method: 'GET',
  }).then<StationMarker[]>(async (response) => {
    setSessionStorage<DisplayPosition>(SESSION_KEY_LAST_REQUEST_POSITION, requestPositionParams);

    const data = await response.json();

    return data.stations;
  });

  return stationMarkers;
};

export const useStationMarkers = () => {
  const {
    isAvailableStationFilterSelected,
    isFastChargeStationFilterSelected,
    isParkingFreeStationFilterSelected,
    isPrivateStationFilterSelected,
  } = useExternalValue(clientStationFiltersStore);

  return useQuery({
    queryKey: [QUERY_KEY_STATION_MARKERS],
    queryFn: fetchStationMarkers,
    select: (data) => {
      return data.filter((station) => {
        const { availableCount, isParkingFree, isPrivate, quickChargerCount } = station;

        const isNoAvailable = isAvailableStationFilterSelected && availableCount === 0;
        const isNoFastCharge = isFastChargeStationFilterSelected && quickChargerCount === 0;
        const isNoFreeParking = isParkingFreeStationFilterSelected && !isParkingFree;
        const isNoPublic = isPrivateStationFilterSelected && isPrivate;

        if (isNoAvailable || isNoFastCharge || isNoFreeParking || isNoPublic) {
          return false;
        }
        return true;
      });
    },
  });
};
