import { useLayoutEffect } from 'react';

import { useMarker } from '@marker/hooks/useRenderMarker';

import type { StationMarker } from '@type';

interface Props {
  station: StationMarker;
}

// TODO: 여기다가 옵셔널로 infoWindow 열리고 닫히는 속성 넣어서 한번 컨트롤 해보기
const DefaultMarkerRenderer = ({ station }: Props) => {
  const { renderDefaultMarker } = useMarker();

  useLayoutEffect(() => {
    const unMount = renderDefaultMarker(station);

    return unMount;
  }, []);

  return <></>;
};

export default DefaultMarkerRenderer;
