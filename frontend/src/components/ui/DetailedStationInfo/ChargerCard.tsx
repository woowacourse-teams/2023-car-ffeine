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

const dateToString = (date: Date) => {
  const currentDate = new Date();
  const diffInSeconds: number = Math.floor((currentDate.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds}초 전`;
  }

  const diffInMinutes: number = Math.floor(diffInSeconds / 60);

  if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  }

  const diffInHours: number = Math.floor(diffInMinutes / 60);

  if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  }

  const diffInDays: number = Math.floor(diffInHours / 24);
  return `${diffInDays}일 전`;
};

const ChargerCard = ({ charger }: ChargerProps) => {
  const { type, price, capacity, latestUpdateTime, state, method } = charger;
  return (
    <Box border px={2} py={3} width={48}>
      <FlexBox alignItems="center" nowrap columnGap={2.8}>
        <FlexBox
          aria-disabled
          background="#e9edf8"
          justifyContent="center"
          alignItems="center"
          nowrap
          css={square}
        >
          <BoltIcon width={24} fill="#5c68d6" />
        </FlexBox>
        <article>
          <Text>{CHARGER_TYPES[type as keyof typeof CHARGER_TYPES]}</Text>
          <Text>{price}원/kWh</Text>
          <Text>
            {capacity}kW({capacity >= 50 ? '급속' : '완속'})
          </Text>
          <Text>{CHARGER_STATES[state as keyof typeof CHARGER_STATES]}</Text>
          {method && <Text>{method}</Text>}
          {latestUpdateTime && <Text>{dateToString(latestUpdateTime)}</Text>}
        </article>
      </FlexBox>
    </Box>
  );
};

const square = css`
  padding: 0.4rem;
  border-radius: 1rem;
`;

export default ChargerCard;
