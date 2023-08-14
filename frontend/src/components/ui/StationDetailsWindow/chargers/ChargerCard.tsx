import { BoltIcon } from '@heroicons/react/24/solid';
import styled, { css } from 'styled-components';

import { calculateLatestUpdateTime } from '@utils/index';

import Box from '@common/Box';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

import { CHARGER_STATES, CONNECTOR_TYPES } from '@constants/chargers';

import type { ChargerDetails, ChargerStateType } from '@type/chargers';

export interface ChargerCardProps {
  charger: ChargerDetails;
}

const statusHeavyColor = (state: ChargerStateType) => {
  switch (state) {
    case 'STANDBY':
      return '#052c65';
    case 'CHARGING_IN_PROGRESS':
      return '#58151c';
    default:
      return '#2b2f32';
  }
};
const statusLightColor = (state: ChargerStateType) => {
  switch (state) {
    case 'STANDBY':
      return '#cfe2ff';
    case 'CHARGING_IN_PROGRESS':
      return '#f8d7da';
    default:
      return '#e9ecef';
  }
};

const ChargerCard = ({ charger }: ChargerCardProps) => {
  const { type, price, capacity, latestUpdateTime, state, method } = charger;
  return (
    <Box border width={36.5} p={2}>
      <SquareBox heavyColor={statusLightColor(state)} lightColor={statusHeavyColor(state)}>
        <FlexBox justifyContent="center" alignItems="center">
          <BoltIcon width={24} fill={statusHeavyColor(state)} />
          <Text>{CHARGER_STATES[state]}</Text>
        </FlexBox>
      </SquareBox>
      <Text my={1}>{CONNECTOR_TYPES[type]}</Text>
      <Text my={1}>
        {capacity >= 50 ? '급속' : '완속'}({capacity}kW)
      </Text>
      {method && <Text my={1}>{method}</Text>}
      {latestUpdateTime && (
        <Text variant="caption" align="right" my={1}>
          업데이트: {calculateLatestUpdateTime(latestUpdateTime)}
        </Text>
      )}
    </Box>
  );
};

const SquareBox = styled.div<{ heavyColor: string; lightColor: string }>`
  padding: 0.4rem;
  border-radius: 10px;
  background: ${({ heavyColor }) => heavyColor};
  color: ${({ lightColor }) => lightColor};
`;

export default ChargerCard;
