import { ChartBarSquareIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

import { useState } from 'react';

import Box from '@common/Box';
import ButtonNext from '@common/ButtonNext';
import FlexBox from '@common/FlexBox';

import { ENGLISH_DAYS_OF_WEEK } from '@constants/congestion';

import type { LongEnglishDaysOfWeek } from '@type';

import Statistics from './Statistics';
import Title from './Title';

interface CongestionStatisticsProps {
  stationId: string;
}

const CongestionStatistics = ({ stationId }: CongestionStatisticsProps) => {
  const todayIndex = new Date().getDay() - 1;
  const [dayOfWeek, setDayOfWeek] = useState<LongEnglishDaysOfWeek>(
    ENGLISH_DAYS_OF_WEEK[todayIndex < 0 ? 6 : todayIndex]
  );
  const [isStatisticsOpen, setIsStatisticsOpen] = useState(true);

  return (
    <Box my={5}>
      <Title />
      {isStatisticsOpen ? (
        <Statistics
          stationId={stationId}
          setIsStatisticsOpen={setIsStatisticsOpen}
          dayOfWeek={dayOfWeek}
          onChangeDayOfWeek={setDayOfWeek}
        />
      ) : (
        <FlexBox justifyContent="center" alignItems="center" minHeight={`${47.5 + 1.4 + 2.2}rem`}>
          <ButtonNext onClick={() => setIsStatisticsOpen(true)} fullWidth size="sm" p={2}>
            <FlexBox justifyContent="center" alignItems="center" columnGap={2}>
              <ChartBarSquareIcon width={24} />
              <p>요일/시간별 혼잡도 확인</p>
              <ChevronDownIcon width={20} />
            </FlexBox>
          </ButtonNext>
        </FlexBox>
      )}
    </Box>
  );
};

export default CongestionStatistics;
