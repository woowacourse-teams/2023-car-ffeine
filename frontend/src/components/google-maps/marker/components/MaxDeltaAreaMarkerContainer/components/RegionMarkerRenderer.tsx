import { useLayoutEffect } from 'react';

import { useMarker } from '@marker/hooks/useRenderMarker';

import type { Region } from '../types';

export interface RegionMarkerProps {
  region: Region;
}

const RegionMarkerRenderer = ({ region }: RegionMarkerProps) => {
  const { renderRegionMarker } = useMarker();

  useLayoutEffect(() => {
    const unmount = renderRegionMarker(region);

    return unmount;
  }, []);

  return <></>;
};

export default RegionMarkerRenderer;
