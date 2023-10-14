import { useState } from 'react';

import { useStationCongestionStatistics } from '@hooks/tanstack-query/station-details/useStationCongestionStatistics';

import Box from '@common/Box';
import Tab from '@common/Tab';

import Error from '@ui/Error';

import type { CHARGING_SPEED } from '@constants/chargers';
import { ENGLISH_DAYS_OF_WEEK, NO_RATIO, SHORT_KOREAN_DAYS_OF_WEEK } from '@constants/congestion';

import type { EnglishDaysOfWeek } from '@type';

import ChargingSpeedButtons from './ChargingSpeedButtons';
import ChargingSpeedButtonsSkeleton from './ChargingSpeedButtonsSkeleton';
import Title from './Title';
import Bar from './bars/Bar';
import BarContainer from './bars/BarContainer';

interface CongestionStatisticsProps {
  stationId: string;
}

const CongestionStatistics = ({ stationId }: CongestionStatisticsProps) => {
  const todayIndex = (new Date().getDay() + 6) % 7; // 월요일 0 ~ 일요일 6

  const [dayOfWeek, setDayOfWeek] = useState<EnglishDaysOfWeek>(ENGLISH_DAYS_OF_WEEK[todayIndex]);

  const {
    data: congestionStatistics,
    isLoading,
    isError,
    refetch,
  } = useStationCongestionStatistics(stationId, dayOfWeek);

  const handleRetry = () => {
    refetch();
  };

  const handleSelectDay = (index: number) => {
    setDayOfWeek(ENGLISH_DAYS_OF_WEEK[index]);
  };

  const hasOnlyStandardCharger = congestionStatistics?.congestion['quick'].every(
    (congestion) => congestion.ratio === NO_RATIO
  );
  const hasOnlyQuickCharger = congestionStatistics?.congestion['standard'].every(
    (congestion) => congestion.ratio === NO_RATIO
  );
  const hasOnlyOneChargerType = hasOnlyStandardCharger || hasOnlyQuickCharger;

  const [chargingSpeed, setChargingSpeed] = useState<keyof typeof CHARGING_SPEED>(
    hasOnlyQuickCharger ? 'quick' : 'standard'
  );

  return (
    <Box my={5}>
      <Title />
      <Tab id="congestion-statistics" initialIndex={todayIndex}>
        <Tab.Menus highlightColor="#4D6CD0">
          {SHORT_KOREAN_DAYS_OF_WEEK.map((day, index) => (
            <Tab.Menu
              key={`${day}-statistics-menu`}
              label={day}
              index={index}
              onClick={() => handleSelectDay(index)}
            />
          ))}
        </Tab.Menus>

        {isError ? (
          <Error
            title="앗"
            message="데이터를 불러오는데 실패했어요."
            subMessage="잠시 후 다시 시도해주세요."
            handleRetry={handleRetry}
            minHeight={42.3}
          />
        ) : (
          SHORT_KOREAN_DAYS_OF_WEEK.map((day, index) => (
            <Tab.Content key={`${day}-statistics-content`} index={index} width="100%">
              <BarContainer
                statistics={congestionStatistics?.congestion[chargingSpeed]}
                renderBar={(hour, ratio) => <Bar hour={hour} ratio={ratio} />}
                isLoading={isLoading}
              />

              {isLoading ? (
                <ChargingSpeedButtonsSkeleton />
              ) : (
                !hasOnlyOneChargerType && (
                  <ChargingSpeedButtons
                    chargingSpeed={chargingSpeed}
                    setChargingSpeed={setChargingSpeed}
                  />
                )
              )}
            </Tab.Content>
          ))
        )}
      </Tab>
    </Box>
  );
};

export default CongestionStatistics;
