import { useQuery } from '@tanstack/react-query';

import { getStoreSnapshot } from '@utils/external-state/tools';
import { getTypedObjectFromEntries } from '@utils/getTypedObjectFromEntries';
import { getTypedObjectKeys } from '@utils/getTypedObjectKeys';
import { getDisplayPosition } from '@utils/google-maps';
import { getQueryFormattedUrl } from '@utils/request-query-params';
import { setSessionStorage } from '@utils/storage';

import { getGoogleMapStore } from '@stores/google-maps/googleMapStore';

import { DELTA_MULTIPLE } from '@constants/googleMaps';
import { QUERY_KEY_CLUSTER_MARKERS } from '@constants/queryKeys';
import { SERVER_URL } from '@constants/server';
import { SESSION_KEY_LAST_REQUEST_POSITION } from '@constants/storageKeys';

import type { ClusterMarker, DisplayPosition } from '@type';

const isMapLoaded = (displayPosition: DisplayPosition) => {
  const { latitudeDelta, longitudeDelta } = displayPosition;

  return !(latitudeDelta === 0 && longitudeDelta === 0);
};

export const fetchClusterMarkers = async () => {
  const googleMap = getStoreSnapshot(getGoogleMapStore());
  const displayPosition = getDisplayPosition(googleMap);

  if (!isMapLoaded(displayPosition)) {
    throw new Error('지도가 로드되지 않았습니다');
  }

  const requestPositionParams: DisplayPosition = {
    ...displayPosition,
    latitudeDelta: displayPosition.latitudeDelta * DELTA_MULTIPLE,
    longitudeDelta: displayPosition.longitudeDelta * DELTA_MULTIPLE,
  };

  const displayPositionKeys = getTypedObjectKeys<DisplayPosition>(requestPositionParams);
  const displayPositionValues = Object.values(requestPositionParams).map(String);

  const displayPositionString = getTypedObjectFromEntries(
    displayPositionKeys,
    displayPositionValues
  );

  // TODO: 가로 몇개, 세로 몇개로 나누어서 요청을 보낼지 정해야됨
  const requestQueryParams = getQueryFormattedUrl({
    ...displayPositionString,
    latitudeDivisionSize: '3',
    longitudeDivisionSize: '4',
  });

  const clusterMarkers = await fetch(`${SERVER_URL}/stations/clusters?${requestQueryParams}`, {
    method: 'GET',
  }).then<ClusterMarker[]>(async (response) => {
    setSessionStorage<DisplayPosition>(SESSION_KEY_LAST_REQUEST_POSITION, requestPositionParams);

    const data = await response.json();

    return data;
  });

  return clusterMarkers;
};

export const useClusterMarkers = () => {
  return useQuery({
    queryKey: [QUERY_KEY_CLUSTER_MARKERS],
    queryFn: fetchClusterMarkers,
  });
};
