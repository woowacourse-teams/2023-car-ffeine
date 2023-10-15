import { useEffect } from 'react';

import { markerInstanceStore } from '@stores/google-maps/markerInstanceStore';

import { useClusterMarkers } from './hooks/useClusterMarkers';
import { useRenderClusterMarkers } from './hooks/useRenderClusterMarker';

const LargeDeltaAreaMarkerContainer = () => {
  const { data: clusterMarkers, isSuccess } = useClusterMarkers();

  const {
    createNewMarkerInstances,
    getRemainedMarkerInstances,
    removeMarkersOutsideBounds,
    removeAllMarkers,
    renderFooMarkers,
  } = useRenderClusterMarkers();

  useEffect(() => {
    return () => {
      // MarkerContainers 컴포넌트에서 SmallMediumDeltaAreaMarkerContainer 컴포넌트가 unmount될 때 모든 마커를 지워준다.
      removeAllMarkers(markerInstanceStore.getState());
    };
  }, []);

  if (clusterMarkers === undefined || !isSuccess) {
    return <></>;
  }

  const newMarkerInstances = createNewMarkerInstances(
    markerInstanceStore.getState(),
    clusterMarkers
  );

  const remainedMarkerInstances = getRemainedMarkerInstances(
    markerInstanceStore.getState(),
    clusterMarkers
  );

  removeMarkersOutsideBounds(markerInstanceStore.getState(), clusterMarkers);
  renderFooMarkers(newMarkerInstances, clusterMarkers);

  markerInstanceStore.setState([...remainedMarkerInstances, ...newMarkerInstances]);

  return <></>;
};

export default LargeDeltaAreaMarkerContainer;
