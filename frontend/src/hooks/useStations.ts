import { useQuery } from '@tanstack/react-query';

import { useExternalValue } from '@utils/external-state';
import { getStoreSnapshot } from '@utils/external-state/tools';
import { getTypedObjectFromEntries } from '@utils/getTypedObjectFromEntries';
import { getTypedObjectKeys } from '@utils/getTypedObjectKeys';
import { getDisplayPosition } from '@utils/google-maps';
import { getQueryFormattedUrl } from '@utils/request-query-params';

import { getGoogleMapStore } from '@stores/googleMapStore';
import {
  selectedCapacitiesFilterStore,
  selectedChargerTypesFilterStore,
  selectedCompanyNamesFilterStore,
} from '@stores/selectedServerStationFiltersStore';
import { stationFilterStore } from '@stores/stationFilterStore';

import { BASE_URL } from '@constants';

import type { DisplayPosition, StationSummary } from 'types';

export const fetchStation = async () => {
  const googleMap = getStoreSnapshot(getGoogleMapStore());
  const displayPosition = getDisplayPosition(googleMap);

  const displayPositionKey = getTypedObjectKeys<DisplayPosition>(displayPosition);
  const displayPositionValue = Object.values(displayPosition).map(String);

  const displayPositionString = getTypedObjectFromEntries(displayPositionKey, displayPositionValue);

  const requestQueryParams = getQueryFormattedUrl({
    ...displayPositionString,
    companyNames: getStoreSnapshot(selectedCompanyNamesFilterStore).join(','),
    capacities: getStoreSnapshot(selectedCapacitiesFilterStore)
      .map((capacity) => `${capacity}.00`)
      .join(','),
    chargerTypes: getStoreSnapshot(selectedChargerTypesFilterStore).join(','),
  });

  const stations = await fetch(`${BASE_URL}/stations?${requestQueryParams}`, {
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
  } = useExternalValue(stationFilterStore);

  return useQuery({
    queryKey: ['stations'],
    queryFn: fetchStation,
    select: (data) => {
      return data.filter((station) => {
        const { availableCount, isParkingFree, chargers, isPrivate } = station;

        const isNoAvailable = isAvailableStationFilterSelected && availableCount === 0;
        const isNoFastCharge =
          isFastChargeStationFilterSelected && !chargers.some((charger) => charger.capacity >= 50);
        const isNoFreeParking = isParkingFreeStationFilterSelected && !isParkingFree;
        const isNoPrivate = isPrivateStationFilterSelected && !isPrivate;

        if (isNoAvailable || isNoFastCharge || isNoFreeParking || isNoPrivate) {
          return false;
        }

        return true;
      });
    },
    staleTime: 30 * 1000,
  });
};
