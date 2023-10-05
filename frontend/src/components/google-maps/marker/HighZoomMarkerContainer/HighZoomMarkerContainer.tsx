import { useEffect } from 'react';

import { useStationMarkers } from '@marker/HighZoomMarkerContainer/hooks/useStationMarkers';

import { useExternalValue } from '@utils/external-state';

import { markerInstanceStore } from '@stores/google-maps/markerInstanceStore';
import { zoomStore } from '@stores/google-maps/zoomStore';

import { useRenderStationMarker } from './hooks/useRenderStationMarker';

const HighZoomMarkerContainer = () => {
  const { data: stationMarkers, isSuccess } = useStationMarkers();
  const {
    createNewMarkerInstances,
    getRemainedMarkerInstances,
    removeMarkersOutsideBounds,
    removeAllMarkers,
    renderDefaultMarkers,
    renderCarffeineMarkers,
  } = useRenderStationMarker();
  const { state: zoomState } = useExternalValue(zoomStore);

  useEffect(() => {
    if (stationMarkers !== undefined) {
      if (zoomState === 'max') {
        renderCarffeineMarkers(markerInstanceStore.getState(), stationMarkers);
      }
      if (zoomState === 'high') {
        renderDefaultMarkers(markerInstanceStore.getState(), stationMarkers);
      }
    }
  }, [zoomState]);

  useEffect(() => {
    return () => {
      // MarkerContainers 컴포넌트에서 HighZoomMarkerContainer 컴포넌트가 unmount될 때 모든 마커를 지워준다.
      removeAllMarkers(markerInstanceStore.getState());
    };
  }, []);

  if (stationMarkers === undefined || !isSuccess) {
    return <></>;
  }

  const newMarkerInstances = createNewMarkerInstances(
    markerInstanceStore.getState(),
    stationMarkers
  );

  const remainedMarkerInstances = getRemainedMarkerInstances(
    markerInstanceStore.getState(),
    stationMarkers
  );

  removeMarkersOutsideBounds(markerInstanceStore.getState(), stationMarkers);

  if (zoomState === 'max') {
    renderCarffeineMarkers(newMarkerInstances, stationMarkers);
  } else {
    renderDefaultMarkers(newMarkerInstances, stationMarkers);
  }

  markerInstanceStore.setState([...remainedMarkerInstances, ...newMarkerInstances]);

  return <></>;
};

export default HighZoomMarkerContainer;
