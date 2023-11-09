import { useLayoutEffect } from 'react';

import { useMarker } from '@marker/hooks/useRenderMarker';

import type { ClusterMarker } from '@type';

interface Props {
  cluster: ClusterMarker;
}

const ClusterMarkerRenderer = ({ cluster }: Props) => {
  const { renderClusterMarker } = useMarker();

  useLayoutEffect(() => {
    const unmount = renderClusterMarker(cluster);

    return unmount;
  }, []);

  return <></>;
};

export default ClusterMarkerRenderer;
