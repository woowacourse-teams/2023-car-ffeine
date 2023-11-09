import { useLayoutEffect } from 'react';

import { useMarker } from '@marker/hooks/useRenderMarker';

import type { StationMarker } from '@type';

interface Props {
  station: StationMarker;
}

const CarffeineMarkerRenderer = ({ station }: Props) => {
  const { renderCarffeineMarker } = useMarker();

  useLayoutEffect(() => {
    const unMount = renderCarffeineMarker(station);

    return unMount;
  }, []);

  return <></>;
};

export default CarffeineMarkerRenderer;
