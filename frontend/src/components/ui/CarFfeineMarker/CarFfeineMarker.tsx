import { styled } from 'styled-components';

import type { StationMarker } from '@type';

const MARKER_COLORS = {
  noAvailable: {
    background: '#EA4335',
    border: '#960A0A',
  },
  available: {
    background: '#3373DC',
    border: '#324F8E',
  },
} as const;

type StationAvailability = keyof typeof MARKER_COLORS;

export const CarFfeineMarker = (station: StationMarker) => {
  const { stationName, availableCount } = station;

  const state: StationAvailability = availableCount === 0 ? 'noAvailable' : 'available';

  return (
    <Marker data-testid="carFfeineMarker" title={stationName} state={state}>
      {availableCount}
    </Marker>
  );
};

const Marker = styled.div<{ state: StationAvailability }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  padding-bottom: 2px;
  background: ${({ state }) => MARKER_COLORS[state].background};
  color: #fff;
  font-size: 1.3rem;
  font-weight: 500;
  text-align: center;
  border-radius: 50%;
  border: 1.5px solid ${({ state }) => MARKER_COLORS[state].border};
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    padding-bottom: 1px;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 10px solid ${({ state }) => MARKER_COLORS[state].background};
  }

  &::before {
    content: '';
    position: absolute;
    bottom: -6.7px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    padding-bottom: 1px;
    border-left: 4.8px solid transparent;
    border-right: 4.8px solid transparent;
    border-top: 5.6px solid ${({ state }) => MARKER_COLORS[state].border};
  }
`;
