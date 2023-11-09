import ClusterMarkerRenderer from './components/ClusterMarkerRenderer';
import { useClusterMarkersQuery } from './hooks/useClusterMarkersQuery';

const LargeDeltaAreaMarkerContainer = () => {
  const { data: clusterMarkers, isSuccess } = useClusterMarkersQuery();

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
