import { useState } from 'react';

import { useStationCongestionStatistics } from '@hooks/tanstack-query/station-details/useStationCongestionStatistics';

import Box from '@common/Box';
import ButtonNext from '@common/ButtonNext';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

import CongestionStatisticsSkeleton from '@ui/StationDetailsWindow/congestion/CongestionStatisticsSkeleton';
import StatisticsGraph from '@ui/StatisticsGraph';

import type { CHARGING_SPEED } from '@constants/chargers';
import { ENGLISH_DAYS } from '@constants/congestion';

interface CongestionStatisticsProps {
  stationId: string;
}

const CongestionStatistics = ({ stationId }: CongestionStatisticsProps) => {
  const { data: congestionStatistics, isLoading } = useStationCongestionStatistics(stationId);
  const [chargingSpeed, setChargingSpeed] = useState<keyof typeof CHARGING_SPEED>('standard');

  if (isLoading) {
    return <CongestionStatisticsSkeleton />;
  }

  return (
    <Box my={5}>
      <Text variant="title" mb={3}>
        충전소 사용통계
      </Text>
      <FlexBox direction="column" gap={4}>
        <StatisticsGraph
          statistics={congestionStatistics.congestion[chargingSpeed]}
          menus={[...ENGLISH_DAYS]}
          align="column"
        />
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
      </FlexBox>
    </Box>
  );
};

export default CongestionStatistics;
