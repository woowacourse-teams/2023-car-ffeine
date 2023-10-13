import { useClusterMarkers } from './hooks/useClusterMarkers';

const LargeDeltaAreaMarkerContainer = () => {
  const { data: clusterMarkers, isSuccess } = useClusterMarkers();

  if (isSuccess) console.log('cluster', clusterMarkers);

  return <></>;
};

export default LargeDeltaAreaMarkerContainer;
