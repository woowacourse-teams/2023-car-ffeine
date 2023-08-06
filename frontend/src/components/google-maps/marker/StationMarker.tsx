import { useEffect } from 'react';

import { useGoogleMap } from '@hooks/google-maps/useGoogleMap';

import type { StationSummary } from '@type';

interface Props {
  station: StationSummary;
}

const StationMarker = ({ station }: Props) => {
  const { renderStationMarker } = useGoogleMap();

  useEffect(() => {
    const unmountStationMarker = renderStationMarker(station);

    return unmountStationMarker;
  }, []);

  return <></>;
};

export default StationMarker;
