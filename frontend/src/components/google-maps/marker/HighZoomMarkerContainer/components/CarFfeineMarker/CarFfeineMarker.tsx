import styled from 'styled-components';

import type { StationMarker } from '@type';

import type { MARKER_COLORS } from './CarFfeineMarker.style';
import { Marker } from './CarFfeineMarker.style';

export type StationAvailability = keyof typeof MARKER_COLORS;

const CarFfeineMarker = (station: StationMarker) => {
  const { stationName, availableCount } = station;

  const state: StationAvailability = availableCount === 0 ? 'noAvailable' : 'available';

  return (
    <Container>
      <Marker
        data-testid="carFfeineMarker"
        data-marker-id={`marker-${station.stationId}`}
        title={stationName}
        state={state}
      >
        {availableCount}
      </Marker>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  left: -13.5px;
  top: -35px;
`;

export default CarFfeineMarker;
