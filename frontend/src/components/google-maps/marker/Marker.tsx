import { useLayoutEffect } from 'react';

import { useGoogleMap } from '@hooks/google-maps/useGoogleMap';

import type { StationMarker } from '@type';

interface Props {
  stationMarker: StationMarker;
}

const Marker = ({ stationMarker }: Props) => {
  const { renderStationMarker } = useGoogleMap();

  useLayoutEffect(() => {
    const unmountStationMarker = renderStationMarker(stationMarker);

    return unmountStationMarker;
  }, []);

  return <></>;
};

export default Marker;
