import RegionMarkerRenderer from './components/RegionMarkerRenderer';
import { useRegionMarkersQuery } from './hooks/useRegionMarkersQuery';

const MaxDeltaAreaMarkerContainer = () => {
  const { data: regions, isSuccess, isError } = useRegionMarkersQuery();
  if (!regions || !isSuccess || isError) {
    return <></>;
  }

  return regions.map((region) => <RegionMarkerRenderer key={region.regionName} region={region} />);
};

export default MaxDeltaAreaMarkerContainer;
