import { useState } from 'react';

import type { CHARGING_SPEED } from '@constants/chargers';
import { NO_RATIO } from '@constants/congestion';

import type { CongestionStatistics } from '@type';

import ChargingSpeedButtons from './ChargingSpeedButtons';
import Bar from './bars/Bar';
import BarContainer from './bars/BarContainer';

interface StatisticsContentProps {
  congestionStatistics: CongestionStatistics;
  isLoading: boolean;
}

const StatisticsContent = ({ congestionStatistics, isLoading }: StatisticsContentProps) => {
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
    <>
      <BarContainer
        statistics={congestionStatistics?.congestion[chargingSpeed]}
        renderBar={(hour, ratio) => <Bar hour={hour} ratio={ratio} />}
        isLoading={isLoading}
      />

      {!isLoading && !hasOnlyOneChargerType && (
        <ChargingSpeedButtons chargingSpeed={chargingSpeed} setChargingSpeed={setChargingSpeed} />
      )}
    </>
  );
};

export default StatisticsContent;
