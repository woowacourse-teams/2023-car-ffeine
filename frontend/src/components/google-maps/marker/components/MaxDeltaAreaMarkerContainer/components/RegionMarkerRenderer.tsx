import { useEffect } from 'react';

import { useRenderRegionMarker } from '../hooks/useRenderRegionMarker';
import type { Region } from '../types';

export interface RegionMarkerProps {
  region: Region;
}

const RegionMarkerRenderer = ({ region }: RegionMarkerProps) => {
  const { renderRegionMarker } = useRenderRegionMarker();

  useEffect(() => {
    const unmountRegionMarker = renderRegionMarker(region);

    return unmountRegionMarker;
  }, []);

  return <></>;
};

export default RegionMarkerRenderer;
