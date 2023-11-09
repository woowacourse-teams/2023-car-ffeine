import ClusterMarkerRenderer from './components/ClusterMarkerRenderer';
import { useClusterMarkers } from './hooks/useClusterMarkers';

const LargeDeltaAreaMarkerContainer = () => {
  const { data: clusterMarkers, isSuccess } = useClusterMarkers();

  if (clusterMarkers === undefined || !isSuccess) {
    return <></>;
  }

  return (
    <>
      {clusterMarkers.map((cluster) => (
        <ClusterMarkerRenderer key={cluster.id} cluster={cluster} />
      ))}
    </>
  );
};

export default LargeDeltaAreaMarkerContainer;
