import styled, { css } from 'styled-components';

import { calculateLatestUpdateTime } from '@utils/index';

import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

import {
  CHARGER_STATES,
  CONNECTOR_TYPES,
  QUICK_CHARGER_CAPACITY_THRESHOLD,
} from '@constants/chargers';

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
    <FlexBox tag="article" outlined nowrap direction="column" width="49%" p={2} css={borderCss}>
      <SquareBox heavyColor={statusLightColor(state)} lightColor={statusHeavyColor(state)}>
        <FlexBox py={0.8} justifyContent="center" alignItems="center">
          <Text css={regularFontWeight}>{CHARGER_STATES[state].state}</Text>
        </FlexBox>
      </SquareBox>
      <Text mt={2} my={0} mb={1.5}>
        {CONNECTOR_TYPES[type]}
      </Text>
      <Text my={0} variant="label">
        {capacity >= QUICK_CHARGER_CAPACITY_THRESHOLD ? '급속' : '완속'}({capacity}kW)
        {method && (
          <Text tag="span" variant="label" my={1}>
            &nbsp;/&nbsp;{method}
          </Text>
        )}
      </Text>
      {latestUpdateTime && (
        <Text variant="caption" align="right" css={bottomTextCss}>
          {CHARGER_STATES[state].message} : {calculateLatestUpdateTime(latestUpdateTime)}
        </Text>
      )}
    </FlexBox>
  );
};

const borderCss = css`
  border: 0.4px solid #66666666;
  height: 142px;
`;

const SquareBox = styled.div<{ heavyColor: string; lightColor: string }>`
  padding: 0.4rem;
  border-radius: 4px;
  background: ${({ heavyColor }) => heavyColor};
  color: ${({ lightColor }) => lightColor};
`;

const regularFontWeight = css`
  font-weight: 500;
`;

const bottomTextCss = css`
  margin-top: auto;
`;

export default ChargerCard;
