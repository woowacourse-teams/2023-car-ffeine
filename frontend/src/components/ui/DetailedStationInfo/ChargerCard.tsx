import { BoltIcon } from '@heroicons/react/24/solid';
import { css } from 'styled-components';

import Button from '@common/Button';
import FlexBox from '@common/FlexBox';
import ListItem from '@common/ListItem';
import Text from '@common/Text';

import { CHARGER_TYPES } from '@constants';

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
    <ListItem css={foundStationList}>
      <Button width="100%" shadow css={foundStationButton}>
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
            <Text
              tag="h3"
              variant="h6"
              title={'카페인팀 충전소'}
              lineClamp={1}
            >{`카페인팀 충전소`}</Text>
            <Text variant="label" align="left" lineClamp={1} color="#585858">
              {`서울특별시 강남구 번릉로 113`}
            </Text>
            <li>{CHARGER_TYPES[type as keyof typeof CHARGER_TYPES]}</li>
            <li>{price}원/kWh</li>
            <li>{capacity >= 50 ? '급속' : '완속'}</li>
            {latestUpdateTime && <li>{dateToString(latestUpdateTime)}</li>}
            <li>충전기 상태: {state}</li>
            {method && <li>{method}</li>}
          </article>
        </FlexBox>
      </Button>
    </ListItem>
  );
};

const square = css`
  padding: 0.4rem;
  border-radius: 1rem;
`;

const foundStationButton = css`
  padding: 1.2rem 1rem 1.4rem;
  box-shadow: 0 0.3rem 0.8rem 0 #ebebeb;
  border-radius: 1.2rem;
`;

const foundStationList = css`
  margin-bottom: 1.6rem;
  padding: 0;
  border-radius: 1rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export default ChargerCard;
