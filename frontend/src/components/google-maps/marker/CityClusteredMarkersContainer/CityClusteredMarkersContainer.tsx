import RegionMarker from './RegionMarker';
import { useRegionMarkers } from './hooks/useRegionMarkers';

const CityClusteredMarkersContainer = () => {
  const { data: regionCounts, isSuccess } = useRegionMarkers();
  if (!regionCounts && !isSuccess) {
    return <></>;
  }

  return regionCounts.map((regionCount) => (
    <RegionMarker key={regionCount.regionName} regionCount={regionCount} />
  ));
};

export default CityClusteredMarkersContainer;
