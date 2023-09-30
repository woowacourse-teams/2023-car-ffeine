import { useEffect } from 'react';

import { useRenderRegionCountMarker } from '../hooks/useRenderRegionCountMarker';
import type { RegionCount } from '../types';

export interface RegionMarkerProps {
  regionCount: RegionCount;
}

const RegionCountMarkerRenderer = ({ regionCount }: RegionMarkerProps) => {
  const { renderRegionCountMarker } = useRenderRegionCountMarker();

  useEffect(() => {
    const unmountRegionCountMarker = renderRegionCountMarker(regionCount);

    return unmountRegionCountMarker;
  }, []);

  return <></>;
};

export default RegionCountMarkerRenderer;
