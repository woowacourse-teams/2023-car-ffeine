import RegionMarker from './components/RegionMarker';
import { useRegionMarkers } from './hooks/useRegionMarkers';

const RegionCountMarkersContainer = () => {
  const { data: regionCounts, isSuccess, isError } = useRegionMarkers();
  if (!regionCounts || !isSuccess || isError) {
    return <></>;
  }

  return regionCounts.map((regionCount) => (
    <RegionMarker key={regionCount.regionName} regionCount={regionCount} />
  ));
};

export default RegionCountMarkersContainer;
