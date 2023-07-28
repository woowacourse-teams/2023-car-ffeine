import { css } from 'styled-components';

import { useState } from 'react';

import Button from '@common/Button';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

import { KOREAN_DAYS, KOREAN_DAYS_TO_ENGLISH_DAYS } from '@constants';

import DaySelectButton from './DaySelectButton';
import GraphBar from './GraphBar';

import type { CongestionStatistics, EnglishDaysType, KoreanDaysType } from 'types';

interface Props {
  statistics: CongestionStatistics;
}

const StatisticsGraph = ({ statistics }: Props) => {
  const [chargeSpeedType, setChargeSpeedType] =
    useState<keyof typeof statistics.congestion>('STANDARD');
  const [selectedDay, setSelectedDay] = useState<EnglishDaysType>('MON');

  const handleToggleChargeSpeedType = () => {
    setChargeSpeedType((prev) => (prev === 'QUICK' ? 'STANDARD' : 'QUICK'));
  };

  const handleSetDay = (day: KoreanDaysType) => {
    setSelectedDay(KOREAN_DAYS_TO_ENGLISH_DAYS[day]);
  };

  return (
    <FlexBox direction="column" gap={3}>
      <FlexBox>
        <Button css={buttonCss} onClick={handleToggleChargeSpeedType}>
          <Text variant="h6">{chargeSpeedType === 'QUICK' ? '급속' : '완속'}</Text>
        </Button>
        {KOREAN_DAYS.map((day, index) => (
          <DaySelectButton
            key={index}
            day={day}
            handleSetDay={handleSetDay}
            isSelected={selectedDay === KOREAN_DAYS_TO_ENGLISH_DAYS[day]}
          />
        ))}
      </FlexBox>
      <FlexBox tag="ul" direction="column">
        {statistics.congestion[chargeSpeedType][selectedDay].map(({ hour, ratio }) => (
          <GraphBar key={hour} congestionRatio={ratio} hour={hour} />
        ))}
      </FlexBox>
    </FlexBox>
  );
};

const buttonCss = css`
  width: 4rem;
  height: 4rem;

  border: 1px solid #d4d4d4;
  border-radius: 50%;
`;

export default StatisticsGraph;
