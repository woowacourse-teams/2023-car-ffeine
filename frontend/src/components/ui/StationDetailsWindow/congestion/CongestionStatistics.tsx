import { useState } from 'react';

import { useStationCongestionStatistics } from '@hooks/tanstack-query/station-details/useStationCongestionStatistics';

import ButtonNext from '@common/ButtonNext';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

import CongestionStatisticsSkeleton from '@ui/StationDetailsWindow/congestion/CongestionStatisticsSkeleton';
import StatisticsGraph from '@ui/StatisticsGraph';

import type { CHARGING_SPEED } from '@constants/chargers';
import { ENGLISH_DAYS } from '@constants/congestion';

const CongestionStatistics = () => {
  const { data: congestionStatistics, isLoading } = useStationCongestionStatistics();
  const [chargingSpeed, setChargingSpeed] = useState<keyof typeof CHARGING_SPEED>('standard');

  if (isLoading) {
    return <CongestionStatisticsSkeleton />;
  }

  return (
    <FlexBox direction="column" gap={4}>
      <FlexBox nowrap>
        <ButtonNext
          variant={chargingSpeed === 'quick' ? 'contained' : 'outlined'}
          size="xs"
          onClick={() => setChargingSpeed('quick')}
          fullWidth
        >
          급속 충전기 그룹
        </ButtonNext>
        <ButtonNext
          variant={chargingSpeed === 'standard' ? 'contained' : 'outlined'}
          size="xs"
          onClick={() => setChargingSpeed('standard')}
          fullWidth
        >
          완속 충전기 그룹
        </ButtonNext>
      </FlexBox>
      <StatisticsGraph
        statistics={congestionStatistics.congestion[chargingSpeed]}
        menus={[...ENGLISH_DAYS]}
        align="column"
      />
    </FlexBox>
  );
};

export default CongestionStatistics;
