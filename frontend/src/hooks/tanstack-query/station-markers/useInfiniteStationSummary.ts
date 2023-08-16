import { useInfiniteQuery } from '@tanstack/react-query';

import { getStoreSnapshot } from '@utils/external-state/tools';
import { getTypedObjectFromEntries } from '@utils/getTypedObjectFromEntries';
import { getTypedObjectKeys } from '@utils/getTypedObjectKeys';
import { getDisplayPosition } from '@utils/google-maps';
import { getQueryFormattedUrl } from '@utils/request-query-params';

import { serverStore } from '@stores/config/serverStore';
import { getGoogleMapStore } from '@stores/google-maps/googleMapStore';
import {
  selectedCapacitiesFilterStore,
  selectedCompaniesFilterStore,
  selectedConnectorTypesFilterStore,
} from '@stores/station-filters/serverStationFiltersStore';

import { SERVERS } from '@constants';
import { COMPANIES } from '@constants/chargers';
import { INITIAL_ZOOM_SIZE } from '@constants/googleMaps';
import { QUERY_KEY_STATIONS } from '@constants/queryKeys';

import type { StationSummary } from '@type';
import type { DisplayPosition } from '@type';

interface StationSummaryResponse {
  stations: StationSummary[];
  hasNextPage: boolean;
}

export const useInfiniteStationSummary = () => {
  const googleMap = getStoreSnapshot(getGoogleMapStore());
  const displayPosition = getDisplayPosition(googleMap);
  const { latitudeDelta, longitudeDelta, latitude, longitude } = displayPosition;

  return useInfiniteQuery<StationSummaryResponse>(
    [QUERY_KEY_STATIONS, `${latitude}, ${longitude} / ${latitudeDelta}, ${longitudeDelta}`],
    async ({ pageParam = '' }) => {
      console.log(pageParam);
      if (latitudeDelta === 0 && longitudeDelta === 0) {
        throw new Error('지도가 로드되지 않았습니다');
      }

      if (displayPosition.zoom < INITIAL_ZOOM_SIZE) {
        return new Promise<StationSummaryResponse>((resolve) =>
          resolve({ stations: [], hasNextPage: false })
        );
      }

      const displayPositionKey = getTypedObjectKeys<DisplayPosition>(displayPosition);
      const displayPositionValue = Object.values(displayPosition).map(String);
      const displayPositionString = getTypedObjectFromEntries(
        displayPositionKey,
        displayPositionValue
      );

      const requestQueryParams = getQueryFormattedUrl({
        ...displayPositionString,
        companyNames:
          getStoreSnapshot(selectedCompaniesFilterStore).size > 0
            ? [...getStoreSnapshot(selectedCompaniesFilterStore)]
                .map((companyKey) => COMPANIES[companyKey])
                .join(',')
            : '',
        capacities:
          getStoreSnapshot(selectedCapacitiesFilterStore).size > 0
            ? [...getStoreSnapshot(selectedCapacitiesFilterStore)].join(',')
            : '',
        chargerTypes:
          getStoreSnapshot(selectedConnectorTypesFilterStore).size > 0
            ? [...getStoreSnapshot(selectedConnectorTypesFilterStore)].join(',')
            : '',
      });

      const lastStationId = pageParam === '' ? `` : `&stationId=${pageParam}`;

      const mode = serverStore.getState();
      const res = await fetch(`${SERVERS[mode]}/stations?${requestQueryParams + lastStationId}`);
      const data = await res.json();
      return data;
    },
    {
      getNextPageParam: (lastPage) => {
        // console.log(JSON.stringify(lastPage));
        return lastPage.stations.length === 10
          ? lastPage.stations[lastPage.stations?.length - 1].stationId
          : undefined;
      },
      refetchOnWindowFocus: false,
    }
  );
};
