import RegionMarker from './RegionMarker';
import { useRegionMarkers } from './useRegionMarkers';

const CityClusteredMarkersContainer = () => {
  const { data: regionCounts, isSuccess } = useRegionMarkers();
  if (!isSuccess) {
    return <></>;
  }

  return regionCounts.map((regionCount) => (
    <RegionMarker key={regionCount.regionName} regionCount={regionCount} />
  ));
};

export default CityClusteredMarkersContainer;
