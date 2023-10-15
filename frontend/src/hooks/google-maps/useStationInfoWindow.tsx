import { useExternalValue } from '@utils/external-state';
import { getDisplayPosition } from '@utils/google-maps';
import { getCalculatedMapDelta } from '@utils/google-maps/getCalculatedMapDelta';

import { getGoogleMapStore } from '@stores/google-maps/googleMapStore';
import { markerInstanceStore } from '@stores/google-maps/markerInstanceStore';
import { getStationInfoWindowStore } from '@stores/google-maps/stationInfoWindowStore';

import useMediaQueries from '@hooks/useMediaQueries';

import StationInfoWindow from '@ui/StationInfoWindow';

export const useStationInfoWindow = () => {
  const googleMap = useExternalValue(getGoogleMapStore());
  const infoWindowInstance = useExternalValue(getStationInfoWindowStore());
  const screen = useMediaQueries();

  const moveMapToStationMarker = (markerInstance: google.maps.marker.AdvancedMarkerElement) => {
    const { latitudeDelta } = getDisplayPosition(getGoogleMapStore().getState());
    const { lat, lng } = markerInstance.position as google.maps.LatLngLiteral;
    const calculatedMapDelta = getCalculatedMapDelta();

    /* 모바일과 PC에서 UI가 서로 다르기 때문에 마커를 클릭했을 때 지도를 이동하는 위치가 달라지는 것을 반영한 코드입니다.
    latitude는 PC에서는 그대로, 모바일에서는 살짝 아래로 밀리도록 계산 (검색창과 간단 정보창이 겹치는 경우 방지)
    longitude는 PC에서는 오른쪽으로 밀리도록 (패널과 간단 정보창이 겹치는 경우 방지), 모바일에서는 그대로 계산 */
    const latitude = screen.get('isMobile') ? lat + latitudeDelta / 3 : lat;
    const longitude = screen.get('isMobile') ? lng : lng - calculatedMapDelta / 2;

    googleMap.panTo({ lat: latitude, lng: longitude });
  };

  const openStationInfoWindow = (
    stationId: string,
    stationMarkerInstance?: google.maps.marker.AdvancedMarkerElement
  ) => {
    const stationMarker = markerInstanceStore
      .getState()
      .find((stationMarker) => stationMarker.id === stationId);
    const markerInstance = stationMarkerInstance ?? stationMarker.instance;

    moveMapToStationMarker(markerInstance);

    infoWindowInstance.infoWindowInstance.open({
      anchor: markerInstance,
      map: googleMap,
    });

    infoWindowInstance.stationInfoWindowRoot.render(
      <StationInfoWindow selectedStationId={stationId} />
    );
  };

  return { openStationInfoWindow };
};
