import RegionMarkerRenderer from './components/RegionMarkerRenderer';
import { useRegionMarkers } from './hooks/useRegionMarkers';

const LowZoomMarkerContainer = () => {
  const { data: regions, isSuccess, isError } = useRegionMarkers();
  if (!regions || !isSuccess || isError) {
    return <></>;
  }

  return regions.map((region) => <RegionMarkerRenderer key={region.regionName} region={region} />);
};

export default LowZoomMarkerContainer;
