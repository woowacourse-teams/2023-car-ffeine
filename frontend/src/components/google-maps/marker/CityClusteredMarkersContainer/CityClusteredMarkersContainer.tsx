import RegionMarker from './RegionMarker';
import { useRegionMarkers } from './useRegionMarkers';

const CityClusteredMarkersContainer = () => {
  const { data: regionMarkers, isSuccess } = useRegionMarkers();
  if (!isSuccess) {
    return <></>;
  }

  return regionMarkers.map((regionMarker) => (
    <RegionMarker key={regionMarker.regionName} region={regionMarker} />
  ));
};

export default CityClusteredMarkersContainer;
