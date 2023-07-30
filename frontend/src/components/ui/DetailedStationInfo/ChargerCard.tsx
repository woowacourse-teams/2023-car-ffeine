import { BoltIcon } from '@heroicons/react/24/solid';
import { css } from 'styled-components';

import Box from '@common/Box';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

import { CHARGER_STATES, CHARGER_TYPES } from '@constants';

import type { ChargerDetails } from '../../../types';

export interface ChargerProps {
  charger: ChargerDetails;
}

const calculateLatestUpdateTime = (latestUpdateTimeString: string) => {
  const currentDate = new Date();
  const latestUpdatedDate = new Date(latestUpdateTimeString);
  const diffInSeconds = Math.floor((currentDate.getTime() - latestUpdatedDate.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds}초 전`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);

  if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);

  if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}일 전`;
};

const ChargerCard = ({ charger }: ChargerProps) => {
  const { type, price, capacity, latestUpdateTime, state, method } = charger;
  return (
    <Box border px={2} py={5} width={39}>
      <FlexBox justifyContent={'center'} alignItems={'center'} css={square}>
        <BoltIcon width={24} fill="#5c68d6" />
        <Text>{CHARGER_STATES[state as keyof typeof CHARGER_STATES]}</Text>
      </FlexBox>
      <article>
        <Text>{CHARGER_TYPES[type as keyof typeof CHARGER_TYPES]}</Text>
        <Text>{price}원/kWh</Text>
        <Text>
          {capacity >= 50 ? '급속' : '완속'}({capacity}kW)
        </Text>
        {method && <Text>{method}</Text>}
      </article>
      {latestUpdateTime && (
        <Text variant="caption" align="right">
          마지막 업데이트: {calculateLatestUpdateTime(latestUpdateTime)}
        </Text>
      )}
    </Box>
  );
};

const square = css`
  padding: 0.4rem;
  border-radius: 1rem;
  background: #e9edf8;
`;

export default ChargerCard;
