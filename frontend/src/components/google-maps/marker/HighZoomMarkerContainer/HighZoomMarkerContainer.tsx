import { useEffect } from 'react';

import { useStationMarkers } from '@marker/HighZoomMarkerContainer/hooks/useStationMarkers';

import { useExternalValue } from '@utils/external-state';

import type { StationMarkerInstance } from '@stores/google-maps/markerInstanceStore';
import { markerInstanceStore } from '@stores/google-maps/markerInstanceStore';
import { deltaAreaStore } from '@stores/google-maps/zoomStore';
import type { DeltaAreaState } from '@stores/google-maps/zoomStore/types';

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
  const deltaAreaState = useExternalValue(deltaAreaStore);

  const renderMarkerByZoomState = (
    deltaAreaState: DeltaAreaState,
    markerInstances: StationMarkerInstance[]
  ) => {
    if (deltaAreaState === 'small') {
      renderCarffeineMarkers(markerInstances, stationMarkers);
    }
    if (deltaAreaState === 'medium') {
      renderDefaultMarkers(markerInstances, stationMarkers);
    }
  };

  useEffect(() => {
    if (stationMarkers !== undefined) {
      renderMarkerByZoomState(deltaAreaState, markerInstanceStore.getState());
    }
  }, [deltaAreaState]);

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
  renderMarkerByZoomState(deltaAreaState, newMarkerInstances);

  markerInstanceStore.setState([...remainedMarkerInstances, ...newMarkerInstances]);

  return <></>;
};

export default HighZoomMarkerContainer;
