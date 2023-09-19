import { useState } from 'react';

import Box from '@common/Box';

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

  return (
    <Box my={5}>
      <Title />
      <Statistics stationId={stationId} dayOfWeek={dayOfWeek} onChangeDayOfWeek={setDayOfWeek} />
    </Box>
  );
};

export default CongestionStatistics;
