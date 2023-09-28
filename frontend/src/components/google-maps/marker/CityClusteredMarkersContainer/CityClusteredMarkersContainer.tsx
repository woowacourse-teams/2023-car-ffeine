import { useRegionMarkers } from './useRegionMarkers';

const CityClusteredMarkersContainer = () => {
  const { data: regionMarkers, isSuccess } = useRegionMarkers();
  if (!isSuccess) {
    return <></>;
  }

  return <></>;
};

export default CityClusteredMarkersContainer;
