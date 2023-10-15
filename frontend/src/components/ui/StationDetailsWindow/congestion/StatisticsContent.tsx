import { useEffect, useState } from 'react';

import FlexBox from '@common/FlexBox';

import type { CHARGING_SPEED } from '@constants/chargers';
import { NO_RATIO } from '@constants/congestion';

import type { CongestionStatistics } from '@type';

import ChargingSpeedButtons from './ChargingSpeedButtons';
import Bar from './bars/Bar';

interface StatisticsContentProps {
  congestionStatistics: CongestionStatistics;
}

const StatisticsContent = ({ congestionStatistics }: StatisticsContentProps) => {
  const hasOnlyStandardChargers = congestionStatistics?.congestion['quick'].every(
    (congestion) => congestion.ratio === NO_RATIO
  );
  const hasOnlyQuickChargers = congestionStatistics?.congestion['standard'].every(
    (congestion) => congestion.ratio === NO_RATIO
  );
  const hasOnlyOneChargerType = hasOnlyStandardChargers || hasOnlyQuickChargers;

  const [chargingSpeed, setChargingSpeed] = useState<keyof typeof CHARGING_SPEED>('standard');

  useEffect(() => {
    if (hasOnlyQuickChargers) {
      setChargingSpeed('quick');
    }
  }, [hasOnlyQuickChargers]);

  return (
    <>
      <FlexBox tag="ul" direction="column" nowrap alignItems="start" width="100%" height="auto">
        {congestionStatistics?.congestion[chargingSpeed].map(({ hour, ratio }) => (
          <Bar key={`statistics-${hour}`} hour={`${hour + 1}`.padStart(2, '0')} ratio={ratio} />
        ))}
      </FlexBox>

      {!hasOnlyOneChargerType && (
        <ChargingSpeedButtons chargingSpeed={chargingSpeed} setChargingSpeed={setChargingSpeed} />
      )}
    </>
  );
};

export default StatisticsContent;
