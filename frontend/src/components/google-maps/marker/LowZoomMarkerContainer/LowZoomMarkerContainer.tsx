import RegionCountMarkerRenderer from './components/RegionCountMarkerRenderer';
import { useRegionMarkers } from './hooks/useRegionMarkers';

const LowZoomMarkerContainer = () => {
  const { data: regionCounts, isSuccess, isError } = useRegionMarkers();
  if (!regionCounts || !isSuccess || isError) {
    return <></>;
  }

  return regionCounts.map((regionCount) => (
    <RegionCountMarkerRenderer key={regionCount.regionName} regionCount={regionCount} />
  ));
};

export default LowZoomMarkerContainer;
