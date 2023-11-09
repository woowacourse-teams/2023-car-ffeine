import { useLayoutEffect } from 'react';

import { useMarker } from '@marker/hooks/useRenderMarker';

import { markerInstanceStore } from '@stores/google-maps/markerInstanceStore';

import type { StationMarker } from '@type';

interface Props {
  station: StationMarker;
}

const DefaultMarkerRenderer = ({ station }: Props) => {
  const { renderDefaultMarker } = useMarker();

  useLayoutEffect(() => {
    // 검색 결과로 강제 생성한 마커에 대해선 새로운 마커 생성을 시도하지 않도록 한다.
    if (markerInstanceStore.getState().every(({ id }) => id !== station.stationId)) {
      const unMount = renderDefaultMarker(station);

      return unMount;
    }
  }, []);

  return <></>;
};

export default DefaultMarkerRenderer;
