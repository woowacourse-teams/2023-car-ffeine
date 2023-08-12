import { useQuery } from '@tanstack/react-query';

import { useExternalValue } from '@utils/external-state';
import { getStoreSnapshot } from '@utils/external-state/tools';
import { getTypedObjectFromEntries } from '@utils/getTypedObjectFromEntries';
import { getTypedObjectKeys } from '@utils/getTypedObjectKeys';
import { getDisplayPosition } from '@utils/google-maps';
import { getQueryFormattedUrl } from '@utils/request-query-params';

import { serverStore } from '@stores/config/serverStore';
import { getGoogleMapStore } from '@stores/google-maps/googleMapStore';
import { clientStationFiltersStore } from '@stores/station-filters/clientStationFiltersStore';
import {
  selectedCapacitiesFilterStore,
  selectedChargerTypesFilterStore,
  selectedCompaniesFilterStore,
} from '@stores/station-filters/serverStationFiltersStore';

import { SERVERS } from '@constants';
import { INITIAL_ZOOM_SIZE } from '@constants/googleMaps';
import { QUERY_KEY_STATIONS } from '@constants/queryKeys';

import type { StationSummary } from '@type';
import type { DisplayPosition } from '@type/stations';

export const fetchStation = async () => {
  const googleMap = getStoreSnapshot(getGoogleMapStore());
  const displayPosition = getDisplayPosition(googleMap);
  const { latitudeDelta, longitudeDelta } = displayPosition;

  if (latitudeDelta === 0 && longitudeDelta === 0) {
    throw new Error('지도가 로드되지 않았습니다');
  }

  if (displayPosition.zoom < INITIAL_ZOOM_SIZE) {
    return new Promise<StationSummary[]>((resolve) => resolve([]));
  }

  const displayPositionKey = getTypedObjectKeys<DisplayPosition>(displayPosition);
  const displayPositionValue = Object.values(displayPosition).map(String);
  const displayPositionString = getTypedObjectFromEntries(displayPositionKey, displayPositionValue);

  const requestQueryParams = getQueryFormattedUrl({
    ...displayPositionString,
    companies:
      getStoreSnapshot(selectedCompaniesFilterStore).size > 0
        ? [...getStoreSnapshot(selectedCompaniesFilterStore)].join(',')
        : '',
    capacities:
      getStoreSnapshot(selectedCapacitiesFilterStore).size > 0
        ? [...getStoreSnapshot(selectedCapacitiesFilterStore)].join(',')
        : '',
    chargerTypes:
      getStoreSnapshot(selectedChargerTypesFilterStore).size > 0
        ? [...getStoreSnapshot(selectedChargerTypesFilterStore)].join(',')
        : '',
  });

  const mode = serverStore.getState();
  const stations = await fetch(`${SERVERS[mode]}/stations?${requestQueryParams}`, {
    method: 'GET',
  }).then<StationSummary[]>(async (response) => {
    const data = await response.json();

    return data.stations;
  });

  return stations;
};

export const useStations = () => {
  const {
    isAvailableStationFilterSelected,
    isFastChargeStationFilterSelected,
    isParkingFreeStationFilterSelected,
    isPrivateStationFilterSelected,
  } = useExternalValue(clientStationFiltersStore);

  return useQuery({
    queryKey: [QUERY_KEY_STATIONS],
    queryFn: fetchStation,
    select: (data) => {
      return data.filter((station) => {
        const { availableCount, isParkingFree, chargers, isPrivate } = station;

        const isNoAvailable = isAvailableStationFilterSelected && availableCount === 0;
        const isNoFastCharge =
          isFastChargeStationFilterSelected && !chargers.some((charger) => charger.capacity >= 50);
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
