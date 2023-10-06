import type { StationMarker } from '@type';

import type { MARKER_COLORS } from './CarFfeineMarker.style';
import { Marker } from './CarFfeineMarker.style';

export type StationAvailability = keyof typeof MARKER_COLORS;

const CarFfeineMarker = (station: StationMarker) => {
  const { stationName, availableCount } = station;

  const state: StationAvailability = availableCount === 0 ? 'noAvailable' : 'available';

  return (
    <Marker
      data-testid="carFfeineMarker"
      data-marker-id={`marker-${station.stationId}`}
      title={stationName}
      state={state}
    >
      {availableCount}
    </Marker>
  );
};

export default CarFfeineMarker;
