import { useLayoutEffect } from 'react';

import { useMarker } from '@marker/hooks/useRenderMarker';

import type { StationMarker } from '@type';

interface Props {
  station: StationMarker;
}

const DefaultMarkerRenderer = ({ station }: Props) => {
  const { renderDefaultMarker } = useMarker();

  useLayoutEffect(() => {
    const unMount = renderDefaultMarker(station);

    return unMount;
  }, []);

  return <></>;
};

export default DefaultMarkerRenderer;
