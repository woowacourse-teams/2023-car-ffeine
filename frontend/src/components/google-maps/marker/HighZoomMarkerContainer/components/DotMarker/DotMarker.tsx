import type { StationMarker } from '@type';

import { Marker } from './DotMarker.style';

interface Props {
  station: StationMarker;
}

const DotMarker = ({ station }: Props) => {
  const isAvailable = station.availableCount > 0;

  return <Marker isAvailable={isAvailable} />;
};

export default DotMarker;
