import { ChartBarSquareIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

import { useState } from 'react';

import Box from '@common/Box';
import ButtonNext from '@common/ButtonNext';
import FlexBox from '@common/FlexBox';

import type { ENGLISH_DAYS_OF_WEEK_FULL_NAME } from '@constants/congestion';

import Statistics from './Statistics';
import Title from './Title';

interface CongestionStatisticsProps {
  stationId: string;
}

const CongestionStatistics = ({ stationId }: CongestionStatisticsProps) => {
  const [isStatisticsOpen, setIsStatisticsOpen] = useState(false);
  const [dayOfWeek, setDayOfWeek] =
    useState<(typeof ENGLISH_DAYS_OF_WEEK_FULL_NAME)[number]>('monday');

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
        <ButtonNext onClick={() => setIsStatisticsOpen(true)} fullWidth size="sm" p={2}>
          <FlexBox justifyContent="center" alignItems="center" columnGap={2}>
            <ChartBarSquareIcon width={24} />
            <p>시간별 혼잡도 확인 (BETA)</p>
            <ChevronDownIcon width={20} />
          </FlexBox>
        </ButtonNext>
      )}
    </Box>
  );
};

export default CongestionStatistics;
