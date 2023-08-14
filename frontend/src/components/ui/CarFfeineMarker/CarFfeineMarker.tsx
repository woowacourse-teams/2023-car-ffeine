import { styled } from 'styled-components';

import type { StationSummary } from '@type';

const enum MarkerColors {
  noAvailableCharger = '#dc3545',
  availableCharger = '#0d6efd',
}

export const CarFfeineMarker = (station: StationSummary) => {
  const { stationName, availableCount } = station;

  const color =
    availableCount === 0 ? MarkerColors.noAvailableCharger : MarkerColors.availableCharger;

  return (
    <Marker title={stationName} color={color}>
      {availableCount}
    </Marker>
  );
};

const Marker = styled.div<{ color: MarkerColors }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  background: ${({ color }) => color};
  color: #fff;
  font-size: 1.3rem;
  text-align: center;
  border-radius: 50%;
  border: 1.4px solid #333;
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
    border-top: 10px solid ${({ color }) => color};
  }

  &::before {
    content: '';
    position: absolute;
    bottom: -7px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    padding-bottom: 1px;
    border-left: 4.8px solid transparent;
    border-right: 4.8px solid transparent;
    border-top: 5.6px solid #333;
  }
`;
