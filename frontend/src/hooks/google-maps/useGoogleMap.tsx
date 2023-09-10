import { createRoot } from 'react-dom/client';

import { useExternalValue, useSetExternalState } from '@utils/external-state';
import { getStoreSnapshot } from '@utils/external-state/tools';

import { getGoogleMapStore } from '@stores/google-maps/googleMapStore';
import { markerInstanceStore } from '@stores/google-maps/markerInstanceStore';
import { selectedStationIdStore } from '@stores/selectedStationStore';

import CarFfeineMarker from '@ui/CarFfeineMarker';
import StationDetailsWindow from '@ui/StationDetailsWindow';
import { useNavigationBar } from '@ui/compound/NavigationBar/hooks/useNavigationBar';

import type { StationMarker } from '@type';

import { useStationSummary } from './useStationSummary';

export const useGoogleMap = () => {
  const googleMap = useExternalValue(getGoogleMapStore());
  const setMarkerInstanceState = useSetExternalState(markerInstanceStore);
  const setSelectedStationId = useSetExternalState(selectedStationIdStore);
  const selectedStationId = getStoreSnapshot(selectedStationIdStore);

  const { openLastPanel } = useNavigationBar();
  const { openStationSummary } = useStationSummary();

  const renderStationMarker = (station: StationMarker) => {
    const { latitude, longitude, stationName, stationId } = station;
    const container = document.createElement('div');

    const markerInstance = new google.maps.marker.AdvancedMarkerElement({
      position: { lat: latitude, lng: longitude },
      map: googleMap,
      title: stationName,
      content: container,
    });

    const markerRoot = createRoot(container);
    markerRoot.render(<CarFfeineMarker {...station} />);

    markerInstance.addListener('click', () => {
      openStationSummary(stationId, markerInstance);
      /**
       * TODO: pc에서만 openLastPanel을 호출하도록 수정
       */
      openLastPanel(<StationDetailsWindow stationId={stationId} />);
    });

    setMarkerInstanceState((previewsMarkerInstances) => [
      ...previewsMarkerInstances,
      {
        stationId,
        markerInstance,
      },
    ]);

    /**
     * [중요] 이 부분은 장거리 검색 결과를 클릭하는 경우 지도에 없어서 마커를 찾지 못하는 버그를 방지합니다.
     */
    if (selectedStationId === stationId) {
      openStationSummary(stationId, markerInstance);
    }

    return () => {
      const selectedStationId = getStoreSnapshot(selectedStationIdStore);

      setMarkerInstanceState((prevMarkerInstances) =>
        prevMarkerInstances.filter((stationMarker) => stationMarker.stationId !== stationId)
      );

      if (selectedStationId === stationId) {
        setSelectedStationId(null);
      }

      markerInstance.map = null;
    };
  };

  return { renderStationMarker };
};
