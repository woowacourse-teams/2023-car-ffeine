import { useEffect } from 'react';

import type { RegionCount } from './types';
import { useRenderRegionCountMarker } from './useRenderRegionCountMarker';

export interface RegionMarkerProps {
  regionCount: RegionCount;
}

const RegionMarker = ({ regionCount }: RegionMarkerProps) => {
  const { renderRegionCountMarker } = useRenderRegionCountMarker();

  useEffect(() => {
    const unmountRegionCountMarker = renderRegionCountMarker(regionCount);

    return unmountRegionCountMarker;
  }, []);

  return <></>;
};

export default RegionMarker;
